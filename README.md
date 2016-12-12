# realtime-dashboard
Realtime dashboard

Reading from Redis and serve via socket

## Install
- Install Golang environment
- Install requirement library

```
go get 
```

## Dev

```
$ go get github.com/astaxie/beego
$ go get github.com/beego/bee
```

Running with hot reload
```
bee run realtime-dashboard
```

## Deploy

```
go build
```

Deploy binary file `realtime-dashboard`
