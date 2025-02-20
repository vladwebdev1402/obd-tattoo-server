FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3050

CMD ["npm", "run", "dev"]