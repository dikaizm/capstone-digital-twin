package bootstrap

import (
	"fmt"

	"log"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	inf_influx "github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/infrastructure/influx"
	inf_mysql "github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/infrastructure/mysql"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"gorm.io/gorm"
)

func SetupMySQLConn(env *Env) *gorm.DB {
	config := inf_mysql.MySQLConfig{
		User:     env.MySQLUser,
		Password: env.MySQLPass,
		Host:     env.MySQLHost,
		Port:     env.MySQLPort,
		DBName:   env.MySQLDatabase,
	}

	// Connect to MySQL database
	db, err := inf_mysql.ConnectMySQL(config)
	if err != nil {
		fmt.Println("Error establishing database connection:", err)
		return nil
	}

	fmt.Println("MySQL database connection successful")
	return db
}

func SetupAutoMigrate(db *gorm.DB) error {
	if err := inf_mysql.MigrateMySQL(db); err != nil {
		fmt.Println("Error migrating database:", err)
		return err
	}
	return nil
}

func InitiateData(db *gorm.DB) {
	initial_role_levels := []domain.UserRole{
		{
			RoleName:     "admin",
			AccessStatus: false,
			AccessStream: false,
			AccessLog:    false,
		},
		{
			RoleName:     "level1",
			AccessStatus: false,
			AccessStream: false,
			AccessLog:    false,
		},
		{
			RoleName:     "level2",
			AccessStatus: false,
			AccessStream: false,
			AccessLog:    false,
		},
		{
			RoleName:     "level3",
			AccessStatus: false,
			AccessStream: false,
			AccessLog:    false,
		},
	}

	if err := db.Create(&initial_role_levels).Error; err != nil {
		log.Fatal(err)
	}

	initial_users := []domain.User{
		{
			Username: "admin",
			Password: "administrator",
			RoleID:   initial_role_levels[0].ID,
		},
	}

	if err := db.Create(&initial_users).Error; err != nil {
		log.Fatal(err)
	}
}

func SetupInfluxConn(env *Env) *influxdb2.Client {
	config := inf_influx.InfluxConfig{
		Host:  env.InfluxHost,
		Port:  env.InfluxPort,
		Org:   env.InfluxOrg,
		Token: env.InfluxToken,
	}

	client := inf_influx.ConnectInflux(config)

	return &client
}
