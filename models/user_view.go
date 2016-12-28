package models

import "time"

type UserView struct {
	Current     int64
	Mobile      int64
	Desktop     int64
	LastMinutes []int64
	CreatedAt   time.Time
}
