# May not work for windows, but you can check the commands from this file and copy paste them in your terminal
build:
	docker-compose -f docker-compose.yaml build

up-prod:
	docker-compose -f docker-compose.yaml up

up-dev:
	docker-compose -f docker-compose.dev.yaml up

down-dev:
	docker-compose -f docker-compose.dev.yaml down

remove-dev:
	docker-compose -f docker-compose.dev.yaml rm

logs-dev:
	docker-compose -f docker-compose.dev.yaml logs
