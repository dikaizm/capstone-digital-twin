@echo off
start cmd /k node-red
cd server
start go run cmd/main.go
cd ../client
npm run serve