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
)

const (
	userHLL = "userHLL"
)

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
				data := models.UserView{
					Current:   count,
					CreatedAt: time.Now(),
				}
				s.SendData(data)
				atomic.AddInt32(&locked, -1)
			}
		}
	}()
}

func countActiveUserAtMinute() (int64, error) {
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
