package socket

import (
	"encoding/json"
	"errors"
	"log"
	"realtime-dashboard/models"
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
				count, err := countActiveUserAtMinute()
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
						Current:   count,
						CreatedAt: time.Now(),
					},
					TrendingVideos: videos,
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

func realtimeVideoViewByMinute(lastMin string) {
	// if res := redis.Redis.HGetAllMap(videoViewCountKey + "_" + lastMin); res != nil {

	// }
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
