FROM node:18-alpine

WORKDIR /opt/app
RUN yarn global add pm2
EXPOSE 3000

WORKDIR /nestjs-dockerized-api

COPY ./package.json .

RUN yarn

COPY . .

RUN yarn build

CMD ["pm2-runtime", "start", "yarn", "--name", "nestjs-dockerized-api", "--interpreter", "sh", "--", "start"]