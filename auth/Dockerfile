FROM node:18.12-alpine3.15

WORKDIR /acute-app/auth

COPY ./*.json ./

RUN npm install

COPY ./src ./src


CMD ["npm","run","start:dev"]

