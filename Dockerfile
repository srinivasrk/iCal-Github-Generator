from node:carbon-alpine

COPY package*.json ./
RUN npm i

COPY . .
