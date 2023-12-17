package api

import (
	"time"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/amqp"
	http_route "github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/http/route"
	ws_route "github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/websocket/route"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/bootstrap"
)

func Start(app *bootstrap.Application) error {
	env := app.Env

	http_route.Setup(time.Duration(env.ContextTimeout), app.DB, app.Server, *env)

	ws_route.Setup(app.Server, app.WebSocket)

	go amqp.SetupEventSubscriber(env, app.DB)

	return app.Server.Run(app.Env.ServerAddress)
}
