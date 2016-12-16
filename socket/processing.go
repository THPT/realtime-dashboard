package socket

import (
	"encoding/json"
	"errors"
	"log"
	"realtime-dashboard/models"
	"realtime-dashboard/postgresql"
	"realtime-dashboard/redis"
	"strconv"
	"sync/atomic"
	"time"

	gredis "gopkg.in/redis.v5"
)

const (
	userHLL           = "userHLL"
	videoTrendingKey  = "video_trending"
	videoViewCountKey = "video_view"
)

type RealTime struct {
	UserView       models.UserView
	TrendingVideos []models.VideoCount
	VideoViews     []models.VideoView
}

type Processing struct{}

func (s *Processing) SendData(data interface{}) {
	payload, _ := json.Marshal(data)
	h.broadcast <- payload
}

func (s Processing) RealtimePushing() {
	ticker := time.NewTicker(30 * time.Second)
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
				count, err := countActiveUserAtMinute()
				if err != nil {
					log.Println(err)
				}

				//VideoView
				videoViews, err := realtimeVideoViewByMinute(time.Now().Add(-20*time.Minute), time.Now())
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
						CreatedAt:   time.Now(),
						LastMinutes: []int64{},
					},
					TrendingVideos: videos,
					VideoViews:     videoViews,
				}
				s.SendData(data)

				atomic.AddInt32(&locked, -1)
			}
		}
	}()
}

func countActiveUserAtMinute() (int64, error) {
	redis.Redis.Del(userHLL)
	minute := time.Now().Minute()

	userHLL1 := keyRedisKeyHLL(minute - 1)
	userHLL2 := keyRedisKeyHLL(minute - 2)
	userHLL3 := keyRedisKeyHLL(minute - 3)
	userHLL4 := keyRedisKeyHLL(minute - 4)
	userHLL5 := keyRedisKeyHLL(minute - 5)
	// merge
	if res := redis.Redis.PFMerge(userHLL, userHLL1, userHLL2, userHLL3, userHLL4, userHLL5); res != nil {
		if err := res.Err(); err != nil {
			return 0, err
		}
	}

	pffCountRes := redis.Redis.PFCount(userHLL)
	if pffCountRes != nil {
		return pffCountRes.Result()
	}
	return 0, errors.New("Can not count: " + userHLL)
}

func keyRedisKeyHLL(minute int) string {
	if minute < 0 {
		minute = minute + 60
	}
	return userHLL + "_" + strconv.Itoa(minute)

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
	err := postgresql.Postgres.Raw(query, from, to).Scan(&videoViews).Error
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
	if res := redis.Redis.ZRevRangeByScoreWithScores(videoTrendingKey, opt); res != nil {
		list, err := res.Result()
		if err != nil {
			return ret, err
		}
		for _, z := range list {
			v := models.VideoCount{
				VideoId: (z.Member).(string),
				Count:   z.Score,
			}
			ret = append(ret, v)
		}
	}

	return ret, nil
}
