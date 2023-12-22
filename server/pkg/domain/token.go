package domain

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type JwtClaims struct {
	SessionID string `json:"session_id"`
	Username  string `json:"username"`
	UserRole  string `json:"user_role"`
	UserID    int    `json:"user_id"`
	jwt.StandardClaims
}

type GenerateTokenType struct {
	Create bool
	Update bool
}

type TokenService interface {
	GenerateToken(req *GenerateTokenRequest, secret string, expiry int) (GenerateTokenResponse, error)
	VerifyToken(requestToken string, secret string) (VerifyTokenResponse, error)

	GetHeader(c *gin.Context) (string, error)
}
