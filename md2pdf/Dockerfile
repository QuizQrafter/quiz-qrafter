FROM node:20.12.2-bookworm

RUN apt-get update -y \
    && apt-get install -y pandoc texlive \
    && apt-get clean

WORKDIR /usr/src/app

COPY package.json ./
COPY index.js ./

RUN npm install

ENV PORT 8080

EXPOSE $PORT

CMD [ "node", "index.js" ]
