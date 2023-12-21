package domain

type Payload struct {
	TagName     string `json:"tag_name"`
	Value       string `json:"value"`
	Timestamp   string `json:"timestamp"`
	PLC         string `json:"plc"`
	MessageType string `json:"message_type"`
}

type TransformPayload struct {
	EquipmentName string      `json:"equipment_name"`
	TagName       string      `json:"tag_name"`
	Value         interface{} `json:"value"`
	Status        int         `json:"status"`
}
