FROM node:lts-alpine3.14

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

CMD [ "node", "script.js" ]