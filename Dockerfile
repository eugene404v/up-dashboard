FROM node:12-alpine as builder

WORKDIR /app

COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build
RUN npm install -g serve@12.0.1

ENV HTTPS true
ENV SSL_CRT_FILE /var/local/pst/ssl/cert.crt
ENV SSL_KEY_FILE /var/local/pst/ssl/cert.key

CMD ["serve", "-s", "build"]