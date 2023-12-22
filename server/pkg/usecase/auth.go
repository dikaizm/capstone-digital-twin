package usecase

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/bootstrap"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/utils"
)

type authUseCase struct {
	authRepo     domain.AuthRepository
	userRepo     domain.UserRepository
	tokenService domain.TokenService
	env          bootstrap.Env
}

func NewAuthUseCase(
	authRepo domain.AuthRepository,
	userRepo domain.UserRepository,
	tokenService domain.TokenService,
	env bootstrap.Env,
) domain.AuthUseCase {
	return &authUseCase{
		authRepo:     authRepo,
		userRepo:     userRepo,
		tokenService: tokenService,
		env:          env,
	}
}

func (c *authUseCase) SignUp(ctx context.Context, details domain.SignUpRequest) error {
	if details.Password != details.ConfirmPassword {
		return errors.New("password did not match")
	}

	existUser, err := c.userRepo.FindByUsername(ctx, details.Username)
	if err != nil {
		return err
	}

	userID := existUser.ID

	if userID != 0 {
		return errors.New("username already exists")
	}

	hashPass, err := utils.GenerateHashPassword(details.Password)
	if err != nil {
		return err
	}

	details.Password = hashPass
	currentTime := time.Now()

	newUser := domain.User{
		Username:  details.Username,
		Password:  hashPass,
		RoleID:    1,
		CreatedAt: currentTime,
		UpdatedAt: currentTime,
	}

	err = c.userRepo.Create(ctx, &newUser)
	if err != nil {
		return err
	}

	return nil
}

func (c *authUseCase) Login(ctx context.Context, details domain.LoginRequest) (domain.UserWithRole, error) {
	user, err := c.userRepo.FindByUsername(ctx, details.Username)
	if err != nil {
		return domain.UserWithRole{}, errors.New("username not found")
	}

	isMatch := utils.VerifyHashPassword(details.Password, user.Password)

	if !isMatch {
		return domain.UserWithRole{}, errors.New("wrong password")
	}

	response := domain.UserWithRole{
		User: domain.User{
			ID:       user.ID,
			Username: user.Username,
			RoleID:   user.RoleID,
		},
		RoleName: user.RoleName,
	}
	return response, nil
}

func (c *authUseCase) Logout(ctx context.Context, sessionID string) error {

	if err := c.authRepo.DeleteSession(ctx, sessionID); err != nil {
		return err
	}
	return nil
}

func (c *authUseCase) GenerateAccessToken(ctx context.Context, tokenReq *domain.GenerateTokenRequest) (domain.GenerateTokenResponse, error) {

	response, err := c.tokenService.GenerateToken(tokenReq, c.env.AccessTokenSecret, c.env.AccessTokenExpiryHour)
	if err != nil {
		return domain.GenerateTokenResponse{}, err
	}

	return response, nil
}

func (c *authUseCase) GenerateRefreshToken(ctx context.Context, tokenReq *domain.GenerateTokenRequest) (domain.GenerateTokenResponse, error) {

	response, err := c.tokenService.GenerateToken(tokenReq, c.env.RefreshTokenSecret, c.env.RefreshTokenExpiryHour)
	if err != nil {
		return domain.GenerateTokenResponse{}, err
	}

	return response, nil
}

func (c *authUseCase) StoreSession(ctx context.Context, userID int, token string, exp time.Time, sessionID string, generateType bool) error {
	var currentTime = time.Now()

	// generateType == true -> create session
	// generateType == false -> update session
	if generateType {

		err := c.authRepo.StoreSession(ctx, domain.UserSession{
			SessionID:    sessionID,
			UserID:       userID,
			RefreshToken: token,
			ExpireAt:     exp,
			LoggedIn:     currentTime,
			LastActive:   currentTime,
		})
		if err != nil {
			return err
		}
	} else {
		session, err := c.authRepo.FindSessionBySessionID(ctx, sessionID)
		if err != nil {
			return err
		}

		err = c.authRepo.UpdateSession(ctx, domain.UserSession{
			SessionID:    session.SessionID,
			RefreshToken: token,
			ExpireAt:     exp,
			LastActive:   currentTime,
		})
		if err != nil {
			return err
		}
	}

	return nil
}

func (c *authUseCase) VerifySession(ctx context.Context, refreshToken string) (domain.VerifyTokenResponse, error) {

	verifyRes, err := c.tokenService.VerifyToken(refreshToken, c.env.RefreshTokenSecret)
	if err != nil {
		return domain.VerifyTokenResponse{}, errors.New("invalid refresh token")
	}
	fmt.Println(verifyRes)
	session, err := c.authRepo.FindSessionBySessionID(ctx, verifyRes.SessionID)
	if err != nil {
		return domain.VerifyTokenResponse{}, err
	}

	if session.SessionID == "" {
		return domain.VerifyTokenResponse{}, errors.New("user session does not exists")
	}
	if time.Since(session.ExpireAt) > 0 {
		return domain.VerifyTokenResponse{}, errors.New("user session expired")
	}

	response := domain.VerifyTokenResponse{
		SessionID: session.SessionID,
		Username:  verifyRes.Username,
		UserRole:  verifyRes.UserRole,
		UserID:    session.UserID,
	}
	return response, nil
}
