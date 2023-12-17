package repository

import (
	"context"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"gorm.io/gorm"
)

type authDatabase struct {
	DB *gorm.DB
}

func NewAuthRepository(DB *gorm.DB) domain.AuthRepository {
	return &authDatabase{DB: DB}
}

func (c *authDatabase) StoreSession(ctx context.Context, session domain.UserSession) error {
	query := `INSERT INTO user_sessions (session_id, user_id, refresh_token, expire_at, logged_in, last_active) VALUES (?, ?, ?, ?, ?, ?)`

	err := c.DB.Exec(query, session.SessionID, session.UserID, session.RefreshToken, session.ExpireAt, session.LoggedIn, session.LastActive).Error

	return err
}

func (c *authDatabase) UpdateSession(ctx context.Context, session domain.UserSession) error {
	query := `UPDATE user_sessions 
              SET refresh_token = ?, 
                  expire_at = ?, 
                  last_active = ?
              WHERE session_id = ?`

	err := c.DB.Exec(query, session.RefreshToken, session.ExpireAt, session.LastActive, session.SessionID).Error

	return err
}

func (c *authDatabase) DeleteSession(ctx context.Context, sessionID string) error {
	query := `DELETE FROM user_sessions WHERE session_id = ?`

	err := c.DB.Exec(query, sessionID).Error

	return err
}

func (c *authDatabase) FindSessionBySessionID(ctx context.Context, sessionID string) (session domain.UserSession, err error) {
	query := `SELECT * FROM user_sessions WHERE session_id = ?`

	err = c.DB.Raw(query, sessionID).Scan(&session).Error

	return session, err
}
