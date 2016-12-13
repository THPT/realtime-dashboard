package main

import (
	"realtime-dashboard/redis"
	_ "realtime-dashboard/routers"

	"github.com/astaxie/beego"
)

func main() {
	redis.InitRedis()
	defer redis.CloseRedis()
	beego.Run()
}
