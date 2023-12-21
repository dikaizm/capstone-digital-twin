package repository

import (
	"context"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"gorm.io/gorm"
)

type userDatabase struct {
	DB *gorm.DB
}

func NewUserRepository(DB *gorm.DB) domain.UserRepository {
	return &userDatabase{DB: DB}
}

func (c *userDatabase) Create(ctx context.Context, user *domain.User) error {
	return c.DB.Create(user).Error
}

func (c *userDatabase) FindByID(ctx context.Context, id int) (user domain.User, err error) {
	query := `SELECT * FROM users WHERE id = ?`
	err = c.DB.Raw(query, id).Scan(&user).Error

	return user, err
}

func (c *userDatabase) FindByUsername(ctx context.Context, username string) (user domain.UserWithRole, err error) {
	query := `
	SELECT u.id, u.username, u.password, u.role_id, ur.role_name
	FROM users AS u
	JOIN user_roles AS ur
	ON u.role_id = ur.id
	WHERE u.username = ?
	`
	err = c.DB.Raw(query, username).Scan(&user).Error

	return user, err
}

func (c *userDatabase) GetRoleByUsername(ctx context.Context, username string) (role string, err error) {
	query := `
	SELECT ur.role_name
	FROM users AS u
	JOIN user_roles AS ur
	ON u.role_id = ur.id
	WHERE u.username = ?
	`
	err = c.DB.Raw(query, username).Scan(&role).Error

	return role, err
}
