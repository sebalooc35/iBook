FROM node AS base

WORKDIR /app

COPY package.json .

#development stage
FROM base AS development

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]

#production stage
FROM base AS production

RUN npm install --only=production

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]