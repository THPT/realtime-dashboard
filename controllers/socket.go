package controllers

import (
	"realtime-dashboard/socket"

	"github.com/astaxie/beego"
)

type SocketController struct {
	beego.Controller
	Socket *socket.Socket
}

func (s *SocketController) Get() {
	s.Socket.ServeWs(s.Ctx.ResponseWriter, s.Ctx.Request)
}
