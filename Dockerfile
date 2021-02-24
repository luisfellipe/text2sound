FROM node:12-alpine

WORKDIR /text2sound

RUN npm install -g contentful-cli

COPY package.json .
RUN npm install

COPY . .

USER node
EXPOSE 8082

CMD ["npm", "run", "start:dev"]
