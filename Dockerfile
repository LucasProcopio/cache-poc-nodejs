FROM node:14-alpine
WORKDIR /app
COPY . ./

ARG ENVIRONMENT

RUN yarn audit --level info
RUN yarn add \
    yarn run prune && \
    yarn cache clean

ENV NODE_PATH=.
ENV NODE_ENV=${ENVIRONMENT}

CMD [ "yarn", "start" ]

EXPOSE 3000
