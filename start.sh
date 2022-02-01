#!/usr/bin/env bash

DIRNAME=$(realpath $0 | rev | cut -d'/' -f2- | rev)
readonly DIRNAME

function _usage() {
  echo -e "Deploy service\n"
  echo -e "Usage:"
  echo -e "  bash $0 [OPTIONS...]\n"
  echo -e "Options:"
  echo -e "      --with-env\tUse env docker file"
  echo ""
  echo -e "  -h, --help\tShow help"
  echo ""

  exit
}

#############
### Arguments
#############

with_env=0

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case ${key} in
  --with-env)
    with_env=1
    shift
    ;;

  -h | --help)
    _usage
    shift
    ;;

  *)
    _usage
    #    shift
    ;;
  esac
done

set -- "${POSITIONAL[@]}"

############
### business
############

echo $DIRNAME

command_gateway=( docker-compose -f docker-compose.yml -f docker/docker-compose.publish.yml )
command_users=( docker-compose -f docker-compose.yml )

if [[ with_env -eq 1 ]]; then
  command_gateway+=( -f docker/docker-compose.env.yml )
  command_users+=( -f docker/docker-compose.env.yml )
fi

command_gateway+=( up -d )
command_users+=( up -d )

cd $DIRNAME/api-gateway

if ! [[ -z HTTP_PORT ]]; then
  HTTP_PORT=$HTTP_PORT COMPOSE_PROJECT_NAME=practice-badesaba "${command_gateway[@]}"
else
  COMPOSE_PROJECT_NAME=practice-badesaba "${command_gateway[@]}"
fi

cd $DIRNAME/ms-users
COMPOSE_PROJECT_NAME=practice-badesaba "${command_users[@]}"

cd $DIRNAME
