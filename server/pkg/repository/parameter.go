package repository

import (
	"github.com/MIND-ID-Tel-U/mindid-digital-twin/server/pkg/domain"
	"gorm.io/gorm"
)

type paramDatabase struct {
	DB *gorm.DB
}

func NewParameterRepository(DB *gorm.DB) domain.ParameterRepository {
	return &paramDatabase{DB: DB}
}

func (pr *paramDatabase) GetParameterByTagAndPLC(params []domain.Parameter, tagName, plc string) (param domain.Parameter) {
	for _, p := range params {
		if tagName == p.TagName && plc == p.PLC {
			return p
		}
	}

	return domain.Parameter{}
}

func (pr *paramDatabase) GetParameters() (params []domain.Parameter, err error) {
	query := `
		SELECT parameters.*, equipments.name AS equipment_name
		FROM parameters
		JOIN equipments ON parameters.equipment_id = equipments.id
	`

	err = pr.DB.Raw(query).Scan(&params).Error

	return params, err
}
