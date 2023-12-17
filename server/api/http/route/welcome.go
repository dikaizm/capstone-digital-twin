package http_route

import (
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/http/controller"
	"github.com/gin-gonic/gin"
)

func NewWelcomeRouter(router *gin.RouterGroup) {
	wc := controller.NewWelcomeController()
	router.GET("/welcome", wc.Welcome)
}
