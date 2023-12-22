package main

import (
	"fmt"
	"log"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/bootstrap"
)

func main() {
	fmt.Println("Hello Inalum, your server is starting...")

	// Initialize the application
	app := bootstrap.App()

	// Set up the MySQL connection for the application
	app.DB = bootstrap.SetupMySQLConn(app.Env)

	// Migrate the database
	if err := bootstrap.SetupAutoMigrate(app.DB); err != nil {
		log.Fatal("Failed to migrate database: ", err)
	} else {
		bootstrap.InitiateData(app.DB)
	}

	// Set up the InfluxDB connection
	app.InfluxDB = bootstrap.SetupInfluxConn(app.Env)

	// Start the server
	if err := api.Start(app); err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}
