FROM node:lts-slim

WORKDIR /opt/
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY config/ ./config
COPY src/ ./src
EXPOSE 38562
ENTRYPOINT ["node", "src"]
