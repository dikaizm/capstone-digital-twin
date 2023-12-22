package controller

import (
	"fmt"
	"net/http"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/http/controller/interfaces"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/bootstrap"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"

	"github.com/gin-gonic/gin"
)

const (
	authorizationHeaderKey string = "Authorization"
	authorizationType      string = "Bearer"
	cookieUserSession      string = "user_session"
	cookieAppSession       string = "app_session"
	cookieUserInfo         string = "uid"
	cookieIsAuthed         string = "is_authed"
)

var generateType = domain.GenerateTokenType{
	Create: true,
	Update: false,
}

type AuthController struct {
	AuthUseCase  domain.AuthUseCase
	TokenService domain.TokenService
	Response     domain.ResponseUsecase
	Env          bootstrap.Env
}

func NewAuthController(
	authUseCase domain.AuthUseCase,
	tokenService domain.TokenService,
	response domain.ResponseUsecase,
	env bootstrap.Env,
) interfaces.AuthController {
	return &AuthController{
		AuthUseCase:  authUseCase,
		TokenService: tokenService,
		Response:     response,
		Env:          env,
	}
}

func (u *AuthController) Login(c *gin.Context) {
	var body domain.LoginRequest

	if err := c.ShouldBindJSON(&body); err != nil {
		u.Response.ErrorResponse(c, http.StatusBadRequest, "Failed to bind JSON", err, body)
		return
	}

	user, err := u.AuthUseCase.Login(c, body)

	if err != nil {
		u.Response.ErrorResponse(c, http.StatusUnauthorized, "Failed to login", err, body)
		return
	}

	u.CreateUserSession(c, &user)
}

func (u *AuthController) SignUp(c *gin.Context) {
	var body domain.SignUpRequest

	if err := c.ShouldBindJSON(&body); err != nil {
		u.Response.ErrorResponse(c, http.StatusBadRequest, "Failed to bind JSON", err, nil)
		return
	}

	if err := u.AuthUseCase.SignUp(c, body); err != nil {
		u.Response.ErrorResponse(c, http.StatusConflict, "Failed to sign up", err, nil)
		return
	}

	u.Response.SuccessResponse(c, http.StatusCreated, "User sign up success", body.Username)
}

func (ac *AuthController) Logout(c *gin.Context) {

	token, err := c.Cookie(cookieUserSession)

	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusNotFound, "Error retrieving cookies", err, nil)
		return
	}

	session, err := ac.AuthUseCase.VerifySession(c, token)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusUnauthorized, "Session unauthorized", err, nil)

	}

	err = ac.AuthUseCase.Logout(c, session.SessionID)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusInternalServerError, "Logout failed", err, nil)

	}

	c.SetCookie(cookieUserSession, "", -1, "", "", false, true)
	c.SetCookie(cookieUserInfo, "", -1, "", "", false, false)
	c.SetCookie(cookieIsAuthed, "false", 3600*24*365, "", "", false, false)

	ac.Response.SuccessResponse(c, http.StatusOK, "Logout success", nil)
}

func (ac *AuthController) CreateUserSession(c *gin.Context, user *domain.UserWithRole) {
	tokenReq := &domain.GenerateTokenRequest{
		Username: user.Username,
		UserRole: user.RoleName,
		UserID:   user.ID,
	}

	accessTokenRes, err := ac.AuthUseCase.GenerateAccessToken(c, tokenReq)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusInternalServerError, "Failed to generate access token", err, nil)
		return
	}

	refreshTokenRes, err := ac.AuthUseCase.GenerateRefreshToken(c, tokenReq)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusInternalServerError, "Failed to generate refresh token", err, nil)
		return
	}

	err = ac.AuthUseCase.StoreSession(c, user.ID, refreshTokenRes.Token, refreshTokenRes.Exp, refreshTokenRes.SessionID, generateType.Create)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusInternalServerError, "Failed to store user session", err, nil)
		return
	}

	authorizationValue := authorizationType + " " + refreshTokenRes.Token
	c.Header(authorizationHeaderKey, authorizationValue)

	cookieExpSession := 3600 * ac.Env.RefreshTokenExpiryHour
	c.SetCookie(cookieUserSession, refreshTokenRes.Token, cookieExpSession, "", "", false, true)

	// Save user info cookie (username, role_name)
	userInfo := fmt.Sprintf("u@@%s/r@@%s", user.Username, user.RoleName)
	cookieExp := 3600 * 12 * ac.Env.RefreshTokenExpiryHour
	c.SetCookie(cookieUserInfo, userInfo, cookieExp, "", "", false, false)

	// Save auth status cookie
	c.SetCookie(cookieIsAuthed, "true", cookieExpSession, "", "", false, false)

	response := domain.TokenResponse{
		AccessToken: accessTokenRes.Token,
	}

	ac.Response.SuccessResponse(c, http.StatusOK, "Successfully logged in", response)
}

func (ac *AuthController) UpdateUserSession(c *gin.Context) {

	token, err := c.Cookie(cookieUserSession)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusNotFound, "Cookie not found", err, nil)
		return
	}

	session, err := ac.AuthUseCase.VerifySession(c, token)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusUnauthorized, "Session unauthorized", err, nil)
		return
	}

	tokenReq := &domain.GenerateTokenRequest{
		SessionID: session.SessionID,
		Username:  session.Username,
		UserRole:  session.UserRole,
		UserID:    session.UserID,
	}

	accessTokenRes, err := ac.AuthUseCase.GenerateAccessToken(c, tokenReq)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusInternalServerError, "Failed to generate access token", err, nil)
		return
	}

	refreshTokenRes, err := ac.AuthUseCase.GenerateRefreshToken(c, tokenReq)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusInternalServerError, "Failed to generate access token", err, nil)
		return
	}

	err = ac.AuthUseCase.StoreSession(c, 0, refreshTokenRes.Token, refreshTokenRes.Exp, session.SessionID, generateType.Update)
	if err != nil {
		ac.Response.ErrorResponse(c, http.StatusInternalServerError, "Failed to store user session", err, nil)
		return
	}

	cookieExpSession := 3600 * ac.Env.RefreshTokenExpiryHour
	c.SetCookie(cookieUserSession, refreshTokenRes.Token, cookieExpSession, "", "", false, true)

	// Save auth status cookie
	c.SetCookie(cookieIsAuthed, "true", cookieExpSession, "", "", false, false)

	response := domain.TokenResponse{
		AccessToken: accessTokenRes.Token,
	}
	ac.Response.SuccessResponse(c, http.StatusOK, "User session updated successfully", response)

}
