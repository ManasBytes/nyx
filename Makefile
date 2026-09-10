.DEFAULT_GOAL := help
UV_RUN := UV_CACHE_DIR=/tmp/init-repo-uv-cache uv run

.PHONY: help check check-backend check-frontend lint lint-backend lint-frontend \
	format format-backend format-frontend format-check format-check-backend \
	format-check-frontend build build-backend build-frontend run run-backend \
	run-frontend migrate backend frontend

help:
	@printf '%s\n' \
		'Available commands:' \
		'  make check                 Run all lint and format checks' \
		'  make check-backend         Check Django code quality' \
		'  make check-frontend        Check Next.js code quality' \
		'  make lint-backend          Run Ruff on the backend' \
		'  make lint-frontend         Run ESLint on the frontend' \
		'  make format                Format both applications' \
		'  make format-check          Verify formatting in both applications' \
		'  make build                 Build frontend and validate backend compilation' \
		'  make run                   Start backend and frontend concurrently' \
		'  make migrate               Apply Django migrations (PostgreSQL must be running)'

check: check-backend check-frontend

check-backend: lint-backend format-check-backend

check-frontend: lint-frontend format-check-frontend

lint: lint-backend lint-frontend

lint-backend:
	cd backend && $(UV_RUN) ruff check config api authentication manage.py

lint-frontend:
	cd frontend && npm run lint

format: format-backend format-frontend

format-backend:
	cd backend && $(UV_RUN) black --workers 1 config api authentication manage.py

format-frontend:
	cd frontend && npm run format

format-check: format-check-backend format-check-frontend

format-check-backend:
	cd backend && $(UV_RUN) black --check --workers 1 config api authentication manage.py

format-check-frontend:
	cd frontend && npm run format:check

build: build-backend build-frontend

build-backend:
	cd backend && $(UV_RUN) python -m compileall -q config api authentication

build-frontend:
	cd frontend && npm run build

run:
	$(MAKE) -j2 run-backend run-frontend

run-backend:
	cd backend && $(UV_RUN) python manage.py runserver

run-frontend:
	cd frontend && npm run dev

migrate:
	cd backend && $(UV_RUN) python manage.py migrate

# Convenience aliases: `make backend` and `make frontend` run focused checks.
backend: check-backend

frontend: check-frontend
