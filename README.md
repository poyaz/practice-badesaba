Introduction
============

This project is a practice for the "badesaba" company interview. This sample project have one microservice and use
mongodb database.

Requirement
===========

* docker
* nodejs

How to deploy
=============

## Use docker

This service has configured as default and no need be change any config. If you want (or need) change configuration, you
should do below steps:

1. First, Select which service you need to change configuration (`moleculer-users`)
2. After select service you should copy `env/users/.env.example` to`env/users/.env`
3. Now I do fill each variable you need to change

```bash
# Change env variable for api gateway
cd moleculer-users
cp env/users/.env.example env/users/.env

# Change .env
vi env/users/.env
```

### Easy deploy

If you want to deploy and use this service you can use below command:

```bash
cd moleculer-users

COMPOSE_PROJECT_NAME=practice-badesaba docker-compose \
  -f docker-compose.yml \
  -f docker/docker-compose.sample.yml \
  up -d
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

API call
========

## Connect

First, you should connect to **NATS** server

**P.S**: If you use a docker, after execute `docker-compose up` NATS server published in 0.0.0.0:4222

```bash
# If you use docker
moleculer connect nats://0.0.0.0:4222

# If you use own NATS server
moleculer connect nats://<NATS-server-ip>:4222
```

## Call action

After connected to NATS server execute this api:

### Get all users

* name: `users.getAll`

```bash
call users.getAll
```

* name: `users.getById`

```bash
call users.getById --@id 00000000-0000-0000-0000-000000000000
```

* name: `users.create`

```bash
call users.create --@email test@example.com --@name test --@family test --@age 20 --@info ''
```

* name: `users.update`

```bash
call users.update --@id <your-document-id> --@name test-change --@family test-change --@age 18
```

* name: `users.delete`

```bash
call users.delete --@id <your-document-id>
```
