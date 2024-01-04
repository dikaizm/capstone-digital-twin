@echo off
cd server/cmd
start cmd /k go run main.go
cd ../../client
npm run serve
cd ..
start node-red