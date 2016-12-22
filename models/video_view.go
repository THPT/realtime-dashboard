package models

import "time"

type VideoCount struct {
	VideoId   string
	VideoName string
	Category  string
	Count     float64
}

type VideoView struct {
	Date      time.Time
	ViewCount int64
}
