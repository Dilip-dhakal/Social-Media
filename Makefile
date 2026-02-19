.PHONY: help install migrate run-backend run-frontend run-all clean docker-up docker-down

help:
	@echo "Available commands:"
	@echo "  make install          - Install all dependencies"
	@echo "  make migrate          - Run database migrations"
	@echo "  make run-backend      - Start Django backend"
	@echo "  make run-frontend     - Start Next.js frontend"
	@echo "  make run-all          - Start both backend and frontend (requires two terminals)"
	@echo "  make docker-up        - Start PostgreSQL and Redis with Docker"
	@echo "  make docker-down      - Stop Docker containers"
	@echo "  make clean            - Clean up Python cache files"
	@echo "  make superuser        - Create Django superuser"

install:
	pip install -r requirements.txt
	npm install

migrate:
	python manage.py migrate

run-backend:
	python manage.py runserver

run-frontend:
	npm run dev

run-all:
	@echo "Starting backend..."
	python manage.py runserver &
	@echo "Starting frontend..."
	npm run dev

docker-up:
	docker-compose up -d
	@echo "Docker services started. Postgres: localhost:5432, Redis: localhost:6379"

docker-down:
	docker-compose down

clean:
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete
	find . -type d -name '.pytest_cache' -exec rm -rf {} +

superuser:
	python manage.py createsuperuser

format:
	black . --exclude='.git,__pycache__,.venv'

lint:
	flake8 . --exclude='.git,__pycache__,.venv'

test-backend:
	python manage.py test

test-frontend:
	npm run test
