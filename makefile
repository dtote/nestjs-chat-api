.DEFAULT_GOAL := build

server:
	@echo "Initialising the server...👷"
	@yarn start

db:
	@echo "Bootin' up the database! 🚗💨"
	@docker-compose up -d


install: 
	@echo "Installing dependencies...⛏"
	@yarn install

build: db install server
	@echo "🏗️ Building..."
	@yarn build

stop:
	@echo "Stopping the database! ❌"
	@docker-compose down
