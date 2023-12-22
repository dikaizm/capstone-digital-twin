package token

import (
	"errors"
	"strings"
	"time"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
)

const (
	authorizationHeaderKey string = "Authorization"
	authorizationType      string = "Bearer"
)

type TokenService struct{}

func NewTokenService() domain.TokenService {
	return &TokenService{}
}

func (ts *TokenService) GenerateToken(req *domain.GenerateTokenRequest, secret string, expiry int) (domain.GenerateTokenResponse, error) {
	exp := time.Now().Add(time.Hour * time.Duration(expiry))

	var sessionID string
	if req.SessionID != "" {
		sessionID = req.SessionID
	} else {
		sessionID = uuid.New().String()
	}

	claims := &domain.JwtClaims{
		Username:  req.Username,
		UserRole:  req.UserRole,
		SessionID: sessionID,
		UserID:    req.UserID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: exp.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(secret))
	if err != nil {
		return domain.GenerateTokenResponse{}, err
	}

	response := domain.GenerateTokenResponse{
		Token:     t,
		Exp:       exp,
		SessionID: sessionID,
	}
	return response, err
}

func (ts *TokenService) VerifyToken(requestToken string, secret string) (domain.VerifyTokenResponse, error) {

	token, err := jwt.ParseWithClaims(requestToken, &domain.JwtClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid token")
		}
		return []byte(secret), nil
	})

	if err != nil {
		return domain.VerifyTokenResponse{}, err
	}

	claims, ok := token.Claims.(*domain.JwtClaims)
	if !ok || !token.Valid {
		return domain.VerifyTokenResponse{}, errors.New("failed to parse or invalid token")
	}

	response := domain.VerifyTokenResponse{
		Username:  claims.Username,
		UserRole:  claims.UserRole,
		SessionID: claims.SessionID,
		UserID:    claims.UserID,
	}

	return response, nil
}

func (ts *TokenService) GetHeader(c *gin.Context) (string, error) {
	authHeader := c.Request.Header.Get(authorizationHeaderKey)
	if authHeader == "" {
		return "", errors.New("authorization header is missing")
	}

	t := strings.Split(authHeader, " ")
	if len(t) != 2 || t[0] != authorizationType {
		return "", errors.New("invalid token or missing Bearer token")
	}

	return t[1], nil
}
