package domain

import (
	"time"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Status  bool        `json:"success"`
	Message string      `json:"message"`
	Error   interface{} `json:"error,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type ResponseUsecase interface {
	SuccessResponse(ctx *gin.Context, statusCode int, message string, data ...interface{})
	ErrorResponse(ctx *gin.Context, statusCode int, message string, err error, data interface{})
}

type LoginResponse struct {
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	RoleID   int    `json:"role_id"`
	RoleName string `json:"role_name"`
}

type TokenResponse struct {
	AccessToken  string `json:"access_token,omitempty"`
	RefreshToken string `json:"refresh_token,omitempty"`
}

type GenerateTokenResponse struct {
	Token     string
	Exp       time.Time
	SessionID string
}

type VerifyTokenResponse struct {
	SessionID string `json:"session_id"`
	Username  string `json:"username"`
	UserRole  string `json:"user_role"`
	UserID    int    `json:"user_id"`
}
