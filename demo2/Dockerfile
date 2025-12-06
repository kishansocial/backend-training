FROM node:current-alpine3.20

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

COPY src src

EXPOSE 3000

CMD ["npm", "run", "dev"]
