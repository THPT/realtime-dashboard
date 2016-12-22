package infra

import (
	"fmt"

	"github.com/astaxie/beego"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
)

var PostgreSql *gorm.DB

func Init() {
	connectionString := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		beego.AppConfig.String("postgresql_username"),
		beego.AppConfig.String("postgresql_password"),
		beego.AppConfig.String("postgresql_host"),
		beego.AppConfig.String("postgresql_port"),
		beego.AppConfig.String("postgresql_db"))
	fmt.Println(connectionString)
	var err error
	PostgreSql, err = gorm.Open("postgres", connectionString)
	if err != nil {
		panic(err)
	}
	err = PostgreSql.DB().Ping()
	if err != nil {
		panic(err)
	}

	// PostgreSql.LogMode(true)
}

func CloseDB() {
	err := PostgreSql.Close()
	if err != nil {
		panic(err)
	}
}
