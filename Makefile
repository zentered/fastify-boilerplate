#!make
MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

start:
		npm start

dev:
		DEBUG=true \
		LOG_LEVEL=debug \
		npm run dev

debug:
		npm run debug

test:
		NODE_ENV=test \
		LOG_ENABLED=false \
		LOG_LEVEL=silent \
		DEBUG=false \
		npm test

watch:
		npx ava --watch

.PHONY: test
.PHONY: dev
.PHONY: watch
.PHONY: build
