FROM node:15.0.0-alpine3.10 as build

RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install 
RUN yarn --network-timeout 1000000 
COPY . .
EXPOSE 8000
