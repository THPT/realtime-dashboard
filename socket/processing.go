package socket

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"realtime-dashboard/infra"
	"realtime-dashboard/models"
	"strconv"
	"sync/atomic"
	"time"

	gredis "gopkg.in/redis.v5"
)

const (
	userHLL           = "userHLL"
	deviceMobileHLL   = "deviceMobileHLL"
	deviceDesktopHLL  = "deviceDesktopHLL"
	videoTrendingKey  = "video_trending"
	videoViewCountKey = "video_view"
	locationCountKey  = "location"
)

type RealTime struct {
	UserView       models.UserView
	TrendingVideos []models.VideoCount
	VideoViews     []models.VideoView
	LocationCount  map[string]int
}

type Processing struct{}

func (s *Processing) SendData(data interface{}) {
	payload, _ := json.Marshal(data)
	h.broadcast <- payload
}

func (s Processing) RealtimePushing() {
	ticker := time.NewTicker(3 * time.Second)
	locked := int32(-1)
	go func() {
		for {
			select {
			case <-ticker.C:
				if atomic.LoadInt32(&locked) == 1 || len(h.connections) == 0 {
					continue
				}
				atomic.AddInt32(&locked, 1)

				//Active user
				count, err := countHLLAtMinute(userHLL)
				if err != nil {
					log.Println(err)
				}
				countDesktopView, err := countHLLAtMinute(deviceDesktopHLL)
				if err != nil {
					log.Println(err)
				}

				countMobileView, err := countHLLAtMinute(deviceMobileHLL)
				if err != nil {
					log.Println(err)
				}

				fmt.Println("TICK")

				//VideoView
				videoViews, err := realtimeVideoViewByMinute(time.Now().Add(-20*time.Minute), time.Now())
				if err != nil {
					log.Println(err)
				}

				locationCount, err := getLocationCount()
				if err != nil {
					log.Println(err)
				}

				//Trending video
				videos, err := getTrendingVideos()
				if err != nil {
					log.Println(err)
				}

				data := RealTime{
					UserView: models.UserView{
						Current:     count,
						Desktop:     countDesktopView,
						Mobile:      countMobileView,
						CreatedAt:   time.Now(),
						LastMinutes: []int64{},
					},
					TrendingVideos: videos,
					VideoViews:     videoViews,
					LocationCount:  locationCount,
				}
				s.SendData(data)

				atomic.AddInt32(&locked, -1)
			}
		}
	}()
}

func getLocationCount() (map[string]int, error) {
	ret := map[string]int{}
	now := time.Now()
	min := now.Minute()
	hour := now.Hour()
	timer := min + hour*60 - 5
	if timer < 0 {
		timer += 24 * 60
	}

	key := locationCountKey + "_" + strconv.Itoa(timer)
	if res := infra.Redis.HGetAll(key); res != nil {
		mapCounting, err := res.Result()
		if err != nil {
			log.Println(err)
			return ret, err
		}

		//Update trending video
		for key, val := range mapCounting {
			count, _ := strconv.Atoi(val)
			ret[key] = count
		}
	}
	return ret, nil
}

func countHLLAtMinute(key string) (int64, error) {
	infra.Redis.Del(key)
	minute := time.Now().Minute()

	HLL1 := keyRedisKeyHLL(key, minute-1)
	HLL2 := keyRedisKeyHLL(key, minute-2)
	HLL3 := keyRedisKeyHLL(key, minute-3)
	HLL4 := keyRedisKeyHLL(key, minute-4)
	HLL5 := keyRedisKeyHLL(key, minute-5)

	// merge
	if res := infra.Redis.PFMerge(key, HLL1, HLL2, HLL3, HLL4, HLL5); res != nil {
		if err := res.Err(); err != nil {
			return 0, err
		}
	}

	pffCountRes := infra.Redis.PFCount(key)
	if pffCountRes != nil {
		return pffCountRes.Result()
	}
	return 0, errors.New("Can not count: " + key)
}

func keyRedisKeyHLL(key string, minute int) string {
	if minute < 0 {
		minute = minute + 60
	}
	return key + "_" + strconv.Itoa(minute)

}

func realtimeVideoViewByMinute(from, to time.Time) ([]models.VideoView, error) {
	query := `
	WITH time_range AS (
	select generate_series(date_trunc('minute', ?::timestamp), date_trunc('minute', ?::timestamp), '1 minute'::interval) AS minute_d
	)
	SELECT date_trunc('minute', minute_d) AS "date", COALESCE(sum(view_count),0) AS view_count
	FROM time_range
	LEFT JOIN video_view_counts ON time_range.minute_d = date_trunc('minute', created_at) 
	GROUP BY date_trunc('minute', minute_d)
	ORDER BY date_trunc('minute', minute_d)
	`
	videoViews := []models.VideoView{}
	err := infra.PostgreSql.Raw(query, from, to).Scan(&videoViews).Error
	return videoViews, err
}

func getTrendingVideos() ([]models.VideoCount, error) {
	// ZREVRANGEBYSCORE video_trending +inf -inf WITHSCORES LIMIT 0 10
	ret := []models.VideoCount{}
	opt := gredis.ZRangeBy{
		Min:    "-inf",
		Max:    "+inf",
		Offset: 0,
		Count:  10,
	}
	fmt.Println("getTrendingVideos")
	if res := infra.Redis.ZRevRangeByScoreWithScores(videoTrendingKey, opt); res != nil {
		fmt.Println(res)
		list, err := res.Result()
		if err != nil {
			return ret, err
		}
		fmt.Println(list)
		videoIds := []string{}
		for _, z := range list {
			v := models.VideoCount{
				VideoId: (z.Member).(string),
				Count:   z.Score,
			}
			videoIds = append(videoIds, v.VideoId)
			ret = append(ret, v)
		}
		videos := []models.Video{}
		err = infra.PostgreSql.Model(models.Video{}).Where("video_id in (?)", videoIds).Scan(&videos).Error
		if err != nil {
			return ret, err
		}

		for _, video := range videos {
			for i, r := range ret {
				if video.VideoID == r.VideoId {
					ret[i].VideoName = video.Title
					ret[i].Category = video.Category
				}
			}
		}
	}

	return ret, nil
}
