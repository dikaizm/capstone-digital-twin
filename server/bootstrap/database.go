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
	var count int64
	db.Model(&domain.UserRole{}).Count(&count)
	if count > 0 {
		fmt.Println("Initial roles already exist in the database")
		return
	}

	initial_role_levels := []domain.UserRole{
		{
			RoleName:     "admin",
			AccessStatus: true,
			AccessStream: true,
			AccessLog:    true,
		},
		{
			RoleName:     "level1",
			AccessStatus: true,
			AccessStream: false,
			AccessLog:    false,
		},
		{
			RoleName:     "level2",
			AccessStatus: true,
			AccessStream: true,
			AccessLog:    false,
		},
		{
			RoleName:     "level3",
			AccessStatus: true,
			AccessStream: true,
			AccessLog:    true,
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
		{
			Username: "director",
			Password: "In4lum123",
			RoleID:   initial_role_levels[1].ID,
		},
		{
			Username: "supervisor",
			Password: "In4lum123",
			RoleID:   initial_role_levels[2].ID,
		},
		{
			Username: "operator",
			Password: "In4lum123",
			RoleID:   initial_role_levels[3].ID,
		},
	}

	if err := db.Create(&initial_users).Error; err != nil {
		log.Fatal(err)
	}

	initial_equipment := []domain.Equipment{
		{
			Name: "vdc",
		},
		{
			Name: "homogenizing",
		},
		{
			Name: "coolingOne",
		},
		{
			Name: "coolingTwo",
		},
	}

	if err := db.Create(&initial_equipment).Error; err != nil {
		log.Fatal(err)
	}

	initial_parameters := []domain.Parameter{
		{
			EquipmentID:   1,
			EquipmentName: initial_equipment[0].Name,
			PLC:           "plc1",
			TagName:       "CCS_E1_PLC_Cabinet_PointIO:3:I.Ch0Data",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Temperature Casting Table",
			IsShown:       true,
		},

		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z1L_airTemp",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Air Temperature Z1 Left",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z1R_airTemp",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Air Temperature Z1 Right",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z2L_airTemp",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Air Temperature Z2 Left",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z1L_logTemp_1",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Billet Temperature Z1 Left",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z2R_airTemp",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Air Temperature Z2 Right",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "DO_QP0421_BF1_HOMO_onOff_rd",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Status",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z1R_logTemp_1",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Billet Temperature Z1 Right",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z2L_logTemp_1",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Billet Temperature Z2 Left",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z2L_logTemp_2",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Billet Temperature Z2 Left",
		},
		{
			EquipmentID:   2,
			EquipmentName: initial_equipment[1].Name,
			PLC:           "plc1",
			TagName:       "GL_BF1_ProcData_furn1Z2R_logTemp_1",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Billet Temperature Z2 Right",
		},

		{
			EquipmentID:   3,
			EquipmentName: initial_equipment[2].Name,
			PLC:           "plc1",
			TagName:       "GL_HMI_ACT_ACS1_logTempL",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Air Temperature Left",
		},
		{
			EquipmentID:   3,
			EquipmentName: initial_equipment[2].Name,
			PLC:           "plc1",
			TagName:       "GL_HMI_ACT_ACS1_logTempR:3:I.Ch0Data",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Air Temperature Right",
		},

		{
			EquipmentID:   4,
			EquipmentName: initial_equipment[3].Name,
			PLC:           "plc1",
			TagName:       "GL_HMI_ACT_ACS2_logTempL",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Air Temperature Left",
		},
		{
			EquipmentID:   4,
			EquipmentName: initial_equipment[3].Name,
			PLC:           "plc1",
			TagName:       "GL_HMI_ACT_ACS2_logTempR:3:I.Ch0Data",
			InputType:     "float",
			Unit:          "°C",
			LowerBound:    nil,
			UpperBound:    nil,
			Label:         "Air Temperature Right",
		},
	}

	if err := db.Create(&initial_parameters).Error; err != nil {
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
