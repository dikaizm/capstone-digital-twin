package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/repository"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"gorm.io/gorm"
)

type MessageResponse struct {
	Message string `json:"message"`
}

type WebSocketConnection struct {
	Conn      *websocket.Conn
	SessionID string
	UserRole  string
}

type WebSocket struct {
	Upgrader *websocket.Upgrader
	User     domain.UserRepository
}

var connections = make(map[string]*WebSocketConnection)

func GetConnections() map[string]*WebSocketConnection {
	return connections
}

func NewWebSocket(
	clientHost string,
	clientPort int,
	db *gorm.DB,
) *WebSocket {
	clientAddress := fmt.Sprintf("%s:%d", clientHost, clientPort)

	upgrader := &websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,

		CheckOrigin: func(r *http.Request) bool {
			allowedOrigins := []string{clientAddress}
			origin := r.Header.Get("Origin")
			for _, allowedOrigin := range allowedOrigins {
				if origin == allowedOrigin {
					return true // Allow the connection
				}
			}
			return false // Reject the connection
		},
	}

	return &WebSocket{
		Upgrader: upgrader,
		User:     repository.NewUserRepository(db),
	}
}

func (ws *WebSocket) WebSocketConn(c *gin.Context) {
	conn, err := ws.Upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("%s, error while Upgrading websocket connection\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Get session ID from URL query string
	sessionID := c.Query("session")
	username := c.Query("username")

	role, err := ws.User.GetRoleByUsername(c, username)

	if err != nil {
		log.Printf("%s, error while getting role from user ID\n", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	currentConn := &WebSocketConnection{
		Conn:      conn,
		SessionID: sessionID,
		UserRole:  role,
	}

	connections[sessionID] = currentConn // Storing connection based on session ID

	log.Printf("WebSocket connection established for session %s, user %s\n", sessionID, username)
}

func WebSocketHandler(conn *WebSocketConnection, payload domain.TransformPayload) {
	if conn.UserRole == "level1" {
		payload.Value = 0
	}

	json, err := json.Marshal(payload)
	if err != nil {
		log.Fatalf("Failed to convert data to json: %v", err)
		return
	}

	if conn.Conn == nil || conn.Conn.WriteMessage(websocket.PingMessage, nil) != nil {
		log.Println("WebSocket connection is closed.")
		return
	}

	if err := conn.Conn.WriteMessage(websocket.TextMessage, json); err != nil {
		if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
			log.Printf("Unexpected close error: %v", err)
		} else {
			log.Printf("Error writing message: %v", err)
		}

		return
	}
}
