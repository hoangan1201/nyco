FROM node:12.16-buster-slim as builder
COPY ./ /source
WORKDIR /source
RUN npm install

FROM node:12.16-buster-slim
RUN mkdir /app
WORKDIR /app
COPY ./ /app
COPY --from=builder /source/node_modules /save/node_modules
COPY ./entrypoint.sh /entrypoint.sh

RUN chmod 777 /entrypoint.sh
