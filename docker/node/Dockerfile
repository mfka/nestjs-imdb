FROM node:13-alpine

ADD --chown=node:node https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait && apk add openssl python g++ make && rm -rf /var/cache/apk/*

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn
COPY . .

CMD /wait && sh -c 'yarn start:dev'
