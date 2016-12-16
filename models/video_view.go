package models

import "time"

type VideoCount struct {
	VideoId   string
	VideoName string
	Count     float64
}

type VideoView struct {
	Date      time.Time
	ViewCount int64
}
