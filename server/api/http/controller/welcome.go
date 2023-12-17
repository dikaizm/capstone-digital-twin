package controller

import (
	"net/http"
	"time"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/api/http/controller/interfaces"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/usecase"

	"github.com/gin-gonic/gin"
)

type WelcomeRequest struct {
	Session string `json:"session"`
}

type WelcomeResponse struct {
	Session string    `json:"session"`
	Time    time.Time `json:"time"`
}

type WelcomeController struct {
	Response domain.ResponseUsecase
}

func NewWelcomeController() interfaces.WelcomeController {
	return &WelcomeController{
		Response: usecase.NewResponseUsecase(),
	}
}

func (wc *WelcomeController) Welcome(c *gin.Context) {
	var body WelcomeRequest

	if err := c.ShouldBindJSON(&body); err != nil {
		wc.Response.ErrorResponse(c, http.StatusBadRequest, "Failed to bind JSON", err, body)
		return
	}

	response := WelcomeResponse{
		Session: body.Session,
		Time:    time.Now(),
	}

	wc.Response.SuccessResponse(c, http.StatusOK, "Welcome to the server!", response)
}
