package http_route

import (
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/http/controller"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/bootstrap"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/repository"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/service/token"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewAuthRouter(router *gin.RouterGroup, db *gorm.DB, env bootstrap.Env) {
	authRepo := repository.NewAuthRepository(db)
	userRepo := repository.NewUserRepository(db)
	tokenServ := token.NewTokenService()
	resUse := usecase.NewResponseUsecase()

	ac := &controller.AuthController{
		AuthUseCase:  usecase.NewAuthUseCase(authRepo, userRepo, tokenServ, env),
		TokenService: tokenServ,
		Response:     resUse,
		Env:          env,
	}

	router.POST("/signup", ac.SignUp)
	router.POST("/login", ac.Login)
	router.GET("/logout", ac.Logout)
	router.GET("/token", ac.UpdateUserSession)
}
