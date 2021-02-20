FROM node:14.15.5-alpine As development

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN npm run build

FROM node:14.15.5-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
