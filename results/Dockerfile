FROM node:lts-slim

WORKDIR /opt/results
RUN yarn global add marked;
ENTRYPOINT for f in *.md ; do marked "$f" -o "${f%%.*}".html ; done; cp README.html index.html; rm ./README.html;
