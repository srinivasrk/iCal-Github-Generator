from node:carbon-alpine

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 3005

CMD ["node", "index.js"]
