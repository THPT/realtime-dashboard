package socket

import (
	"encoding/json"
	"log"
	"net/http"
	"realtime-dashboard/models"
	"sync/atomic"
	"time"

	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 3 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Socket struct{}

func (s *Socket) InitSocket() {
	go h.run()
	go s.SendMessage()
}

type connection struct {
	ws   *websocket.Conn
	send chan []byte
}

func (c *connection) write(mt int, payload []byte) error {
	c.ws.SetWriteDeadline(time.Now().Add(writeWait))
	return c.ws.WriteMessage(mt, payload)
}

func (c *connection) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.ws.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				if err := c.write(websocket.CloseMessage, []byte{}); err != nil {
					h.unregister <- c
					return
				}
				return
			}
			if err := c.write(websocket.TextMessage, message); err != nil {
				h.unregister <- c
				return
			}
		case <-ticker.C:
			if err := c.write(websocket.PingMessage, []byte{}); err != nil {
				h.unregister <- c
				return
			}
		}
	}
}

func (s *Socket) ServeWs(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	c := &connection{send: make(chan []byte, 256), ws: ws}
	h.register <- c
	go c.writePump()
}

func (s *Socket) SendData(data interface{}) {
	payload, _ := json.Marshal(data)
	h.broadcast <- payload
}

func (s *Socket) SendMessage() {
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
				data := models.UserView{
					Total:     10,
					Mobile:    4,
					Desktop:   6,
					CreatedAt: time.Now(),
				}
				s.SendData(data)
				atomic.AddInt32(&locked, -1)
			}
		}
	}()
}
