package socket

import (
	"fmt"
)

type hub struct {
	connections map[*connection]bool
	broadcast   chan []byte
	register    chan *connection
	unregister  chan *connection
}

var h = hub{
	broadcast:   make(chan []byte),
	register:    make(chan *connection),
	unregister:  make(chan *connection),
	connections: make(map[*connection]bool),
}

func (h *hub) run() {
	for {
		select {
		case c := <-h.register:
			h.connections[c] = true
			fmt.Println("Connected, Number of connection", len(h.connections))
		case c := <-h.unregister:
			if _, ok := h.connections[c]; ok {
				delete(h.connections, c)
				close(c.send)
				fmt.Println("Disconnected, number of connect remaining:", len(h.connections))
			}
		case m := <-h.broadcast:
			for c := range h.connections {
				select {
				case c.send <- m:
				default:
					close(c.send)
					delete(h.connections, c)
					fmt.Println("Disconnected, number of connect remaining:", len(h.connections))
				}
			}
		}
	}
}
