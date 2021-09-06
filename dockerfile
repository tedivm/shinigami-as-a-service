FROM node:16-alpine

RUN mkdir workspace
WORKDIR workspace

RUN apk add unzip bash curl

COPY ./bin/get_data.sh ./get_data.sh
RUN ./get_data.sh

COPY package.json ./
RUN npm install

COPY README.md ./README.md
COPY app ./app

CMD ["node", "app/server.js"]
