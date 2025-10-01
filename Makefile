.PHONY: help build up down restart logs shell clean test dev prod

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Production commands
build: ## Build production Docker images
	docker-compose build

rebuild: ## Rebuild and restart production containers
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
	@echo "Application rebuilt and running at http://localhost:3000"

up: ## Start production containers
	docker-compose up -d
	@echo "Application is running at http://localhost:3000"

down: ## Stop production containers
	docker-compose down

restart: ## Restart production containers
	docker-compose restart

logs: ## View production logs
	docker-compose logs -f

shell: ## Open shell in production app container
	docker-compose exec app sh

ps: ## Show running containers
	docker-compose ps

# Development commands
dev: ## Start development environment
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development environment started:"
	@echo "  - Application: http://localhost:3000"
	@echo "  - Adminer: http://localhost:8080"
	@echo "  - PostgreSQL: localhost:5433"
	@echo "  - Redis: localhost:6380"

dev-build: ## Build development images
	docker-compose -f docker-compose.dev.yml build

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

dev-logs: ## View development logs
	docker-compose -f docker-compose.dev.yml logs -f

dev-shell: ## Open shell in development app container
	docker-compose -f docker-compose.dev.yml exec app-dev sh

dev-restart: ## Restart development containers
	docker-compose -f docker-compose.dev.yml restart

# Database commands
db-shell: ## Open PostgreSQL shell (development)
	docker-compose -f docker-compose.dev.yml exec postgres-dev psql -U iot_user -d iot_airquality_dev

db-backup: ## Backup database
	docker-compose -f docker-compose.dev.yml exec postgres-dev pg_dump -U iot_user iot_airquality_dev > backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "Database backed up to backup_$$(date +%Y%m%d_%H%M%S).sql"

db-restore: ## Restore database from backup (usage: make db-restore FILE=backup.sql)
	@if [ -z "$(FILE)" ]; then echo "Usage: make db-restore FILE=backup.sql"; exit 1; fi
	docker-compose -f docker-compose.dev.yml exec -T postgres-dev psql -U iot_user -d iot_airquality_dev < $(FILE)

# Maintenance commands
clean: ## Remove containers and volumes
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v

clean-all: ## Remove containers, volumes, and images
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.dev.yml down -v --rmi all

prune: ## Clean up Docker system
	docker system prune -a --volumes

status: ## Show container status
	@echo "Production:"
	@docker-compose ps
	@echo "\nDevelopment:"
	@docker-compose -f docker-compose.dev.yml ps

health: ## Check container health
	@docker inspect --format='{{.Name}}: {{.State.Health.Status}}' $$(docker ps -q) 2>/dev/null || echo "No running containers with health checks"

# Testing commands
test: ## Run tests in container
	docker-compose run --rm app npm test

test-dev: ## Run tests in development
	docker-compose -f docker-compose.dev.yml run --rm app-dev npm test

# Utility commands
install: ## Install dependencies
	docker-compose run --rm app npm install

install-dev: ## Install dependencies in development
	docker-compose -f docker-compose.dev.yml run --rm app-dev npm install

update: ## Update dependencies
	docker-compose run --rm app npm update

npm: ## Run npm command (usage: make npm CMD="install express")
	@if [ -z "$(CMD)" ]; then echo "Usage: make npm CMD=\"install express\""; exit 1; fi
	docker-compose run --rm app npm $(CMD)

# Deployment commands
deploy: ## Deploy to production
	@echo "Building production images..."
	docker-compose build
	@echo "Starting containers..."
	docker-compose up -d
	@echo "Deployment complete!"
	docker-compose ps

rollback: ## Rollback to previous version
	docker-compose down
	git checkout HEAD~1
	docker-compose up -d --build

# Monitoring commands
watch: ## Watch logs in real-time
	docker-compose logs -f --tail=100

stats: ## Show container resource usage
	docker stats $$(docker-compose ps -q)
