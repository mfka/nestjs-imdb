.DEFAULT_GOAL := start

cert:
	docker-compose exec -T node sh -ac "openssl req -newkey rsa:2048 -nodes -keyout docker/nginx/\"\$${DOMAIN}\".key -x509 -days 365 -out docker/nginx/\"\$${DOMAIN}\".crt"
debug:
	docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up --build -d
start:
	docker-compose -f ./docker-compose.yml up --build -d
stop:
	docker-compose -f ./docker-compose.yml stop
restart:
	make stop && make start
e2e:
	docker-compose exec -T node sh -ac "yarn test:e2e"
