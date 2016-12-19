package models

import "time"

type Video struct {
	VideoID        string
	Url            string
	Category       string
	Title          string
	Description    string
	ThumbnailImage string
	PublishedTime  time.Time
	ChannelId      string
	ChannelTitle   string
	ProductId      string
}
