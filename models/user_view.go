package models

import "time"

type UserView struct {
	Total     int
	Desktop   int
	Mobile    int
	CreatedAt time.Time
}
