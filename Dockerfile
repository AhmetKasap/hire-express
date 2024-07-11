FROM node

WORKDIR /opt/rest-api
COPY . /opt/rest-api

RUN npm install


CMD ["node", "app.js"]