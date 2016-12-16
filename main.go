package main

import (
	"realtime-dashboard/postgresql"
	"realtime-dashboard/redis"
	_ "realtime-dashboard/routers"

	"github.com/astaxie/beego"
)

func main() {
	redis.InitRedis()
	defer redis.CloseRedis()

	postgresql.Init()
	defer postgresql.CloseDB()
	beego.Run()
}
