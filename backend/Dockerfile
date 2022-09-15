FROM node:16

WORKDIR /usr/src/app

# RUN apk add --no-cache --virtual .build-deps git python3 build-base &&\
#   apk add --no-cache --virtual .app-deps ffmpeg

RUN apt-get update && apt-get install build-essential

COPY package.json yarn.lock ./

RUN yarn install

COPY ./ ./

RUN yarn build

# RUN yarn seed:run 

CMD ["node", "dist/main.js"]