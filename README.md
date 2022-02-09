Introduction
============

This project is a practice for the "badesaba" company interview. This sample project have one gateway and one microservice and communicate with each other (With mongo database);

Requirement
===========

* docker
* typescript
* nodejs
* mongo

How to deploy
=============

## Use docker

This service has configured as default and no need be change any config.

### Easy deploy

If you want to deploy and use this service you can use below command:

```bash
# Api gateway service default published in port 300
docker-compose up -d

# Change api gateway publish port
HTTP_PORT=8080 docker-compose up -d
```

## without docker

If you don't use docker you have to do below step:

1. You should install nodejs version 14 or above
2. go to `moleculer-users` folder
3. copy `env/users/.env.example` to`env/users/.env`
4. open file **env/app/.env**
5. change environment variable `MOLECULER_TRANSPORTER_URL` with your **NATS** server (Default: `nats://nats:4222`)
6. change environment variable `MONGO_URI` with your **mongodb** server (Default: `mongodb://mongo/moleculer-users`)
7. execute this command: `npm install --production; npm start`
8. go to `api-gateway`
9. copy `env/app/.env.example` to`env/app/.env`
10. open file **env/app/.env**
11. change environment variable `SERVICE_MOLECULER_USERS_HOST` for connect to **NATS** server
12. change environment variable `SERVICE_MOLECULER_USERS_PORT` for connect to **NATS** server
13. execute this command: `npm install; npm run build; npm run start:prod`
