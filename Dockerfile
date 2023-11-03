FROM node:21.1.0-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD npm run start

FROM nginx:latest

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html