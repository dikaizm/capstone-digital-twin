package domain

type Equipment struct {
	ID   uint   `gorm:"primary_key" json:"id"`
	Name string `gorm:"not null;unique" json:"name"`
}

type Parameter struct {
	ID            uint    `gorm:"primary_key" json:"id"`
	EquipmentID   uint    `gorm:"not null" json:"equipment_id"`
	EquipmentName string  `json:"equipment_name"`
	PLC           string  `gorm:"not null" json:"plc"`
	TagName       string  `gorm:"not null;unique" json:"tag_name"`
	InputType     string  `gorm:"not null" json:"input_type"`
	Unit          string  `gorm:"not null" json:"unit"`
	LowerBound    *string `gorm:"null" json:"lower_bound"`
	UpperBound    *string `gorm:"null" json:"upper_bound"`
	Label         string  `gorm:"not null" json:"label"`
	IsShown       bool    `gorm:"not null" json:"is_shown"`

	Equipment Equipment `gorm:"foreignKey:EquipmentID;references:ID" json:"equipment"`
}

func (Equipment) TableName() string {
	return "equipments"
}

type ParameterRepository interface {
	GetParameterByTagAndPLC(params []Parameter, tagName string, plc string) (param Parameter)
	GetParameters() (params []Parameter, err error)
}
