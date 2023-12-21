package domain

import (
	"context"
	"time"
)

type UserSession struct {
	SessionID    string    `json:"session_id" gorm:"primaryKey;index"`
	UserID       int       `json:"user_id" gorm:"not null;index"`
	RefreshToken string    `json:"refresh_token" gorm:"not null"`
	ExpireAt     time.Time `json:"expire_at" gorm:"not null"`
	LoggedIn     time.Time `json:"logged_in" gorm:"not null"`
	LastActive   time.Time `json:"last_active" gorm:"null"`

	User User `gorm:"foreignKey:UserID;references:ID"`
}

type AuthRepository interface {
	StoreSession(ctx context.Context, session UserSession) error
	UpdateSession(ctx context.Context, session UserSession) error
	DeleteSession(ctx context.Context, sessionID string) error
	FindSessionBySessionID(ctx context.Context, sessionID string) (session UserSession, err error)
}

type AuthUseCase interface {
	SignUp(ctx context.Context, details SignUpRequest) error
	Login(ctx context.Context, details LoginRequest) (user UserWithRole, err error)
	Logout(ctx context.Context, sessionID string) error

	GenerateAccessToken(ctx context.Context, tokenReq *GenerateTokenRequest) (GenerateTokenResponse, error)
	GenerateRefreshToken(ctx context.Context, tokenReq *GenerateTokenRequest) (GenerateTokenResponse, error)
	StoreSession(ctx context.Context, userID int, token string, exp time.Time, sessionID string, generateType bool) error
	VerifySession(ctx context.Context, refreshToken string) (VerifyTokenResponse, error)
}
