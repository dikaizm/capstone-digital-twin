package bootstrap

import (
	"log"

	"github.com/spf13/viper"
)

type Env struct {
	AppEnv         string `mapstructure:"APP_ENV"`
	ServerHost     string `mapstructure:"SERVER_HOST"`
	ServerPort     int    `mapstructure:"SERVER_PORT"`
	ServerAddress  string `mapstructure:"SERVER_ADDRESS"`
	ContextTimeout int    `mapstructure:"CONTEXT_TIMEOUT"`

	ClientHost      string `mapstructure:"CLIENT_HOST"`
	ClientPort      int    `mapstructure:"CLIENT_PORT"`
	ClientSecretKey string `mapstructure:"CLIENT_SECRET_KEY"`

	MySQLHost     string `mapstructure:"MYSQL_HOST"`
	MySQLPort     int    `mapstructure:"MYSQL_PORT"`
	MySQLUser     string `mapstructure:"MYSQL_USER"`
	MySQLPass     string `mapstructure:"MYSQL_PASS"`
	MySQLDatabase string `mapstructure:"MYSQL_DATABASE"`

	RabbitMQHost string `mapstructure:"RABBITMQ_HOST"`
	RabbitMQPort int    `mapstructure:"RABBITMQ_PORT"`
	RabbitMQUser string `mapstructure:"RABBITMQ_USER"`
	RabbitMQPass string `mapstructure:"RABBITMQ_PASS"`

	InfluxHost  string `mapstructure:"INFLUX_HOST"`
	InfluxPort  int    `mapstructure:"INFLUX_PORT"`
	InfluxOrg   string `mapstructure:"INFLUX_ORG"`
	InfluxToken string `mapstructure:"INFLUX_TOKEN"`

	AccessTokenExpiryHour  int    `mapstructure:"ACCESS_TOKEN_EXPIRY_HOUR"`
	RefreshTokenExpiryHour int    `mapstructure:"REFRESH_TOKEN_EXPIRY_HOUR"`
	AccessTokenSecret      string `mapstructure:"ACCESS_TOKEN_SECRET"`
	RefreshTokenSecret     string `mapstructure:"REFRESH_TOKEN_SECRET"`
}

func NewEnv() *Env {
	env := Env{}
	viper.SetConfigFile(".env")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal("File .env not found: ", err)
	}

	err = viper.Unmarshal(&env)
	if err != nil {
		log.Fatal("Failed to load environment: ", err)
	}

	if env.AppEnv == "development" {
		log.Println("Server is running in development environment")
	}

	return &env
}
