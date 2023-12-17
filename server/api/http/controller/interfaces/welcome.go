package interfaces

import "github.com/gin-gonic/gin"

type WelcomeController interface {
	Welcome(c *gin.Context)
}
