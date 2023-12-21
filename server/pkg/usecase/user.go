package usecase

import (
	"context"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
)

type userUseCase struct {
	userRepo domain.UserRepository
}

func NewUserUseCase(
	userRepo domain.UserRepository,
) domain.UserUseCase {
	return &userUseCase{
		userRepo: userRepo,
	}
}

func (c *userUseCase) GetUserRole(ctx context.Context, username string) (string, error) {
	role, err := c.userRepo.GetRoleByUsername(ctx, username)
	if err != nil {
		return "", err
	}

	return role, nil
}
