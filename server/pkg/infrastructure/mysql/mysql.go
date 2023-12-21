package inf_mysql

import (
	"fmt"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type MySQLConfig struct {
	User     string
	Password string
	Host     string
	Port     int
	DBName   string
}

func ConnectMySQL(config MySQLConfig) (*gorm.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", config.User, config.Password, config.Host, config.Port, config.DBName)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}

func MigrateMySQL(db *gorm.DB) error {
	err := db.AutoMigrate(
		&domain.UserRole{},
		&domain.User{},
		&domain.UserSession{},
		&domain.Equipment{},
		// &domain.Parameter{},
	)
	if err != nil {
		return err
	}
	return nil
}
