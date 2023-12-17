package ws_route

import (
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/websocket/controller"
	"github.com/gin-gonic/gin"
)

func Setup(r *gin.Engine, ws *controller.WebSocket) {
	r.GET("/ws", ws.WebSocketConn)
}
