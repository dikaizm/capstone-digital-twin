package middleware

import (
	"net/http"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/service/token"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/usecase"
	"github.com/gin-gonic/gin"
)

func Authenticate(secret string) gin.HandlerFunc {
	response := usecase.NewResponseUsecase()
	token := token.NewTokenService()

	return func(c *gin.Context) {

		authToken, err := token.GetHeader(c)
		if err != nil {
			response.ErrorResponse(c, http.StatusUnauthorized, "User not authorized", err, nil)
			c.Abort()
			return
		}

		verifyRes, err := token.VerifyToken(authToken, secret)

		if err != nil {
			response.ErrorResponse(c, http.StatusUnauthorized, "User not authorized", err, nil)
			c.Abort()
			return
		}

		c.Set("session_id", verifyRes.SessionID)
		c.Next()
	}
}
