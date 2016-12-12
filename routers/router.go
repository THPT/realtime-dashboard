package routers

import (
	"realtime-dashboard/controllers"
	"realtime-dashboard/socket"

	"github.com/astaxie/beego"
)

func init() {
	socket := &socket.Socket{}
	socket.InitSocket()
	beego.Router("/", &controllers.MainController{})
	beego.Router("/ws", &controllers.SocketController{Socket: socket})
}
