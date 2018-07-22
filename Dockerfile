FROM node:carbon

RUN apt-get update

RUN apt-get install -y libssl-dev

WORKDIR /opt/cetelem-api

RUN chown -R node:node .

COPY package*.json ./

RUN npm install --quiet --no-optional

COPY . .

EXPOSE 3000

USER node

CMD ["./node_modules/.bin/pm2-runtime", "server/index.js"]