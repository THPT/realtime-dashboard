package models

import "time"

type UserView struct {
	Current     int64
	LastMinutes []int64
	CreatedAt   time.Time
}
