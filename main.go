package main

import (
	"realtime-dashboard/infra"
	_ "realtime-dashboard/routers"

	"github.com/astaxie/beego"
)

func main() {
	infra.InitRedis()
	defer infra.CloseRedis()

	infra.Init()
	defer infra.CloseDB()
	beego.Run()
}
