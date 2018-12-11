FROM node:lts-slim

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY public/ ./public
COPY src/ ./src
EXPOSE 8080
RUN yarn build
ENTRYPOINT ["yarn", "serve"]
