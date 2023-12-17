package interfaces

import (
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"github.com/gin-gonic/gin"
)

type AuthController interface {
	Login(c *gin.Context)
	SignUp(c *gin.Context)
	Logout(c *gin.Context)
	CreateUserSession(c *gin.Context, user *domain.UserWithRole)
	UpdateUserSession(c *gin.Context)
}
