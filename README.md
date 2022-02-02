Introduction
============

This project is a practice for the "badesaba" company interview. This sample project have one gateway and one microservice and communicate with each other.


Requirement
===========

* docker
* typescript
* nodejs

How to deploy
=============

## Use docker

This service has configured as default and no need be change any config. If you want (or need) change configuration, you should do below steps:

1. First, Select which service you need to change configuration (`api-gateway` or `ms-users`)
2. After select service you should copy `env/app/.env.example` to`env/app/.env`
3. Now I do fill each variable you need to change

```bash
# Change env variable for api gateway
cd api-gateway
cp env/app/.env.example env/app/.env

# Change .env
vi env/app/.env

##########################

# Change env variable for users service
cd ms-users
cp env/app/.env.example env/app/.env

# Change .env
vi env/app/.env
```

### manual

This service deploy manually with docker like that:

* You don't use environment variable file (Api gateway publish in port 3000)

```bash
cd api-gateway
# Default port publish is 3000
COMPOSE_PROJECT_NAME=practice-badesaba docker-compose \
  -f docker-compose.yml \
  -f docker/docker-compose.publish.yml \
  up -d
  
# Change port publish to 8000
HTTP_PORT=8080 COMPOSE_PROJECT_NAME=practice-badesaba docker-compose \
  -f docker-compose.yml \
  -f docker/docker-compose.publish.yml \
  up -d

cd ms-users
COMPOSE_PROJECT_NAME=practice-badesaba docker-compose \
  -f docker-compose.yml \
  up -d
```

* You use environment variable file

```bash
cd api-gateway
COMPOSE_PROJECT_NAME=practice-badesaba docker-compose \
  -f docker-compose.yml \
  -f docker/docker-compose.env.yml \
  -f docker/docker-compose.publish.yml \
  up -d

cd ms-users
COMPOSE_PROJECT_NAME=practice-badesaba docker-compose \
  -f docker-compose.yml \
  -f docker/docker-compose.env.yml \
  up -d
```

### cli (nodejs)

You can use nodejs cli to deploy service.

```bash
node start.js

# If you use env
node start.js --with-env

# If you want change api gateway port
HTTP_PORT=8080 node start.js
```

### cli (bash)

You can use bash cli to deploy service.

```bash
bash start.sh

# If you use env
bash start.sh --with-env

# If you want change api gateway port
HTTP_PORT=8080 bash start.sh
```

## without docker

If you don't use docker you have to do below step:

1. You should install nodejs version 14 or above
2. go to `ms-users` folder
3. copy `env/app/.env.example` to`env/app/.env`
4. open file **env/app/.env**
5. change environment variable `SERVER_HTTP_PORT` for http server
6. change environment variable `SERVER_RPC_PORT` for rpc server
7. execute this command: `npm install; npm run build; npm run start:prod`
8. go to `api-gateway`
9. copy `env/app/.env.example` to`env/app/.env`
10. open file **env/app/.env**
11. change environment variable `SERVER_HTTP_PORT` for http server
12. change environment variable `SERVICE_USERS_PORT` for connect to **users** microservice via rpc (Variable should equal with step 6)
13. execute this command: `npm install; npm run build; npm run start:prod`
