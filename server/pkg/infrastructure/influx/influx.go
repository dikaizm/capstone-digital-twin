package inf_influx

import (
	"fmt"

	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
)

type InfluxConfig struct {
	Host   string
	Port   int
	Token  string
	Org    string
	Bucket string
}

func ConnectInflux(config InfluxConfig) influxdb2.Client {

	url := fmt.Sprintf("http://%s:%d", config.Host, config.Port)

	client := influxdb2.NewClient(url, config.Token)
	defer client.Close()

	// queryAPI := client.QueryAPI(config.Org)
	// writeAPI := client.WriteAPIBlocking(config.Org, config.Bucket)

	return client
}
