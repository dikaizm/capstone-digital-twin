package domain

import (
	"context"
	"time"
)

type User struct {
	ID        int       `json:"id" gorm:"primaryKey"`
	Username  string    `json:"username" gorm:"unique"`
	Password  string    `json:"password" binding:"required"`
	RoleID    int       `json:"role_id" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"null"`

	Role UserRole `json:"role" gorm:"foreignKey:RoleID;references:ID"`
}

type UserRole struct {
	ID           int    `json:"id" gorm:"primaryKey"`
	RoleName     string `json:"role_name" gorm:"unique;not null"`
	AccessStatus bool   `json:"access_status" gorm:"not null"`
	AccessStream bool   `json:"access_stream" gorm:"not null"`
	AccessLog    bool   `json:"access_log" gorm:"not null"`

	Users []User `json:"users" gorm:"foreignKey:RoleID"`
}

type UserWithRole struct {
	User
	RoleName string `json:"role_name"`
}

type UserRepository interface {
	Create(ctx context.Context, user *User) error
	FindByID(ctx context.Context, id int) (user User, err error)
	FindByUsername(ctx context.Context, username string) (user UserWithRole, err error)
}
