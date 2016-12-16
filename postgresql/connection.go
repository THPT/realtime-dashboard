package postgresql

import (
	"fmt"

	"github.com/astaxie/beego"
	_ "github.com/lib/pq"

	"github.com/jinzhu/gorm"
)

var Postgres *gorm.DB

func Init() {
	connectionString := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		beego.AppConfig.String("postgresql_username"),
		beego.AppConfig.String("postgresql_password"),
		beego.AppConfig.String("postgresql_host"),
		beego.AppConfig.String("postgresql_port"),
		beego.AppConfig.String("postgresql_db"))
	fmt.Println(connectionString)
	var err error
	Postgres, err = gorm.Open("postgres", connectionString)
	if err != nil {
		panic(err)
	}
	err = Postgres.DB().Ping()
	if err != nil {
		panic(err)
	}

	Postgres.LogMode(true)
}

func CloseDB() {
	err := Postgres.Close()
	if err != nil {
		panic(err)
	}
}
