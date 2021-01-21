FROM node:14

WORKDIR /ui

COPY package.json /ui

RUN yarn install

COPY . /ui

EXPOSE 3000

CMD [ "npm", "start" ]
