FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333

# CMD ["yarn", "prisma", "migrate", "dev", "&&", "yarn", "build", "&&", "yarn", "start"]