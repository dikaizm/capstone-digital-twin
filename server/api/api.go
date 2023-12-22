package api

import (
	"time"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/amqp"
	http_route "github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/http/route"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/websocket/controller"
	ws_route "github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/websocket/route"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/bootstrap"
)

func Start(app *bootstrap.Application) error {
	env := app.Env

	// Initialize HTTP server
	http_route.Setup(time.Duration(env.ContextTimeout), app.DB, app.Server, *env)

	// Initialize WebSocket server
	app.WebSocket = controller.NewWebSocket(
		app.Env.ClientHost,
		app.Env.ClientPort,
		app.DB,
	)
	ws_route.Setup(app.Server, app.WebSocket)

	// Initialize AMQP subscriber
	go amqp.SetupEventSubscriber(env, app.DB)

	return app.Server.Run(app.Env.ServerAddress)
}
