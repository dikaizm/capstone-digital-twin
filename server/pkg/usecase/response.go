package usecase

import (
	"log"
	"strings"

	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"github.com/gin-gonic/gin"
)

type response struct{}

func NewResponseUsecase() domain.ResponseUsecase {
	return &response{}
}

func (r *response) SuccessResponse(ctx *gin.Context, statusCode int, message string, data ...interface{}) {

	log.Printf("\033[0;32m%s\033[0m\n", message)

	response := domain.Response{
		Status:  true,
		Message: message,
		Error:   nil,
		Data:    data,
	}
	ctx.JSON(statusCode, response)

}

func (r *response) ErrorResponse(ctx *gin.Context, statusCode int, message string, err error, data interface{}) {

	log.Printf("\033[0;31m%s\033[0m\n", err.Error())

	errFields := strings.Split(err.Error(), "\n")
	response := domain.Response{
		Status:  false,
		Message: message,
		Error:   errFields,
		Data:    data,
	}
	ctx.JSON(statusCode, response)

}
