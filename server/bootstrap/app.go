package bootstrap

import (
	"fmt"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/websocket/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"gorm.io/gorm"
)

type Application struct {
	Env       *Env
	DB        *gorm.DB
	InfluxDB  *influxdb2.Client
	Server    *gin.Engine
	WebSocket *controller.WebSocket
}

func App() *Application {
	app := &Application{}
	app.Env = NewEnv()

	// Initialize HTTP server
	app.Server = gin.Default()
	app.Server.ForwardedByClientIP = true
	app.Server.SetTrustedProxies([]string{app.Env.ServerHost})

	corsConfig := cors.DefaultConfig()

	clientAddress := fmt.Sprintf("%s:%d", app.Env.ClientHost, app.Env.ClientPort)
	corsConfig.AllowOrigins = []string{clientAddress}
	// To be able to send tokens to the server.
	corsConfig.AllowCredentials = true
	// OPTIONS method for ReactJS
	corsConfig.AddAllowMethods("OPTIONS")

	app.Server.Use(cors.New(corsConfig))

	// Initialize WebSocket server
	app.WebSocket = controller.NewWebSocket(
		app.Env.ClientHost,
		app.Env.ClientPort,
		app.DB,
	)

	return app
}
