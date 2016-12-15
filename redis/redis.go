package redis

import (
	"fmt"

	"github.com/astaxie/beego"

	"gopkg.in/redis.v5"
)

var Redis *redis.Client

func InitRedis() {
	Redis = redis.NewClient(&redis.Options{
		Addr:     beego.AppConfig.String("redis_host") + ":" + beego.AppConfig.String("redis_port"),
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	_, err := Redis.Ping().Result()
	if err != nil {
		panic(err)
	}
}
func CloseRedis() {
	if Redis != nil {
		if err := Redis.Close(); err != nil {
			fmt.Println("[ERROR] Cannot close Redis connection, err:", err)
		}
	}
}
