# https://makefiletutorial.com/

.PHONY: all help run build compose build-deploy

echo: 
	echo "Makefile working" 

## Runs the microservice
run:
	npm run dev

## Builds the Docker image
build:
	make tidy
	sudo docker build -t ad-agency-dapp:latest .

## Deploy the microservice using Docker Compose
deploy:
	sudo docker-compose -f docker-compose.yml --env-file .env up -d --force-recreate
	
## Builds and deploys the microservice
build-deploy:
	make build
	make deploy

## Update dependencies
tidy:
	# sudo npm install -g npm-check-updates
	ncu -u
	npm i
	npm run lint