package http_route

import (
	"time"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/http/middleware"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/bootstrap"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(timeout time.Duration, db *gorm.DB, gin *gin.Engine, env bootstrap.Env) {
	api := gin.Group("/api")
	{
		public := api.Group("")

		// Public APIs
		NewWelcomeRouter(public)
		NewAuthRouter(public, db, env)

		protected := api.Group("")

		// Middleware
		protected.Use(middleware.Authenticate(env.RefreshTokenSecret))

		// Private APIs
		// NewProfileRouter(env, timeout, db, protected)
		// NewDashboardRouter(env, timeout, db, protected)
	}

}
