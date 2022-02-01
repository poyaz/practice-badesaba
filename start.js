const { execSync } = require('child_process');

const args = [...process.argv.slice(2)];

const withEnv = args.findIndex((v) => v === '--with-env') > -1;
const publishHttpPort = Object.hasOwnProperty.call(process.env, 'HTTP_PORT') ? process.env['HTTP_PORT'] : '';

const docker = {
  gateway: [
    'COMPOSE_PROJECT_NAME=practice-badesaba',
    'docker-compose',
    '-f docker-compose.yml',
    '-f docker/docker-compose.publish.yml',
  ],
  users: [
    'COMPOSE_PROJECT_NAME=practice-badesaba',
    'docker-compose',
    '-f docker-compose.yml',
  ],
};

if (withEnv) {
  docker.gateway.push('-f docker/docker-compose.env.yml');
  docker.users.push('-f docker/docker-compose.env.yml');
}

if (publishHttpPort) {
  docker.gateway = [`HTTP_PORT=${publishHttpPort}`, ...docker.gateway];
}

docker.gateway.push('up -d');
docker.users.push('up -d');

execSync(docker.gateway.join(' '), { encoding: 'utf8', cwd: './api-gateway' });
execSync(docker.users.join(' '), { encoding: 'utf8', cwd: './ms-users' });



