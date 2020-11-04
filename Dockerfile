FROM node:14-alpine
WORKDIR /app
COPY . ./

RUN yarn audit --level info
RUN yarn add \
    yarn run prune && \
    yarn cache clean

CMD [ "yarn", "start" ]

EXPOSE 3000
