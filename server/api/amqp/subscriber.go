package amqp

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"strconv"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/websocket/controller"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/bootstrap"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/repository"
	"github.com/fatih/color"
	amqp "github.com/rabbitmq/amqp091-go"
	"gorm.io/gorm"
)

var (
	inColor = color.New(color.FgCyan).SprintFunc()
)

func SetupEventSubscriber(env *bootstrap.Env, db *gorm.DB) {
	dsn := fmt.Sprintf("amqp://%s:%s@%s:%d", env.RabbitMQUser, env.RabbitMQPass, env.RabbitMQHost, env.RabbitMQPort)
	log.Printf("AMQP connection: %s", dsn)

	// Connect to RabbitMQ server
	conn, err := amqp.Dial(dsn)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}
	defer conn.Close()

	// Create a channel
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %v", err)
	}
	defer ch.Close()

	// Declare a queue
	q, err := ch.QueueDeclare(
		"inalum", // queue name
		false,    // durable
		false,    // delete when unused
		false,    // exclusive
		false,    // no-wait
		nil,      // arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare a queue: %v", err)
	}

	// Consume messages from the queue
	msgs, err := ch.Consume(
		q.Name, // queue name
		"",     // consumer name
		true,   // auto-acknowledge
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // arguments
	)
	if err != nil {
		log.Fatalf("Failed to consume messages from the queue: %v", err)
	}

	pr := repository.NewParameterRepository(db)

	params, err := pr.GetParameters()
	if err != nil {
		log.Fatalf("Failed to get data parameter: %v", err)
		return
	}

	wsConnections := controller.GetConnections()

	for msg := range msgs {
		ProcessMessage(msg, &params, &wsConnections, db)
	}
}

func ProcessMessage(msg amqp.Delivery, params *[]domain.Parameter, connections *map[string]*controller.WebSocketConnection, db *gorm.DB) {

	// log.Printf("%s %s", inColor("Received message:"), string(msg.Body))

	payload := &domain.Payload{}
	if err := json.Unmarshal(msg.Body, &payload); err != nil {
		fmt.Println("Error:", err)
		return
	}

	messageType := payload.MessageType

	if messageType == "plc" {
		plc := payload.PLC
		tagName := payload.TagName

		pr := repository.NewParameterRepository(db)
		param := pr.GetParameterByTagAndPLC(*params, tagName, plc)

		transformPayload := domain.TransformPayload{
			EquipmentName: param.EquipmentName,
			TagName:       param.TagName,
		}

		if param.InputType == "int" {
			intValue, err := strconv.Atoi(payload.Value)
			if err != nil {
				intValue = 0
			}

			transformPayload.Value = intValue
		} else if param.InputType == "float" {
			floatValue, err := strconv.ParseFloat(payload.Value, 64)
			if err != nil {
				floatValue = 0.0
			}

			transformPayload.Value = math.Round(floatValue*100) / 100
		}

		// Get equipment status based on value
		if transformPayload.Value == nil {
			transformPayload.Status = 3
		} else if transformPayload.Value == 0 {
			transformPayload.Status = 2
		} else {
			transformPayload.Status = 1
		}

		for _, conn := range *connections {
			controller.WebSocketHandler(conn, transformPayload)
		}
	}
}
