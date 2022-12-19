FROM node:18.12-alpine3.15

WORKDIR /app/auth

COPY ./package*.json .

RUN npm install

COPY ./* ./

CMD ["npm","run","start:dev"]

