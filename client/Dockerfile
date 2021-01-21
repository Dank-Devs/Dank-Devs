FROM node:14

WORKDIR /ui

COPY package.json /ui
COPY yarn.lock /ui

RUN yarn install

COPY . /ui

EXPOSE 3000

CMD [ "npm", "start" ]
