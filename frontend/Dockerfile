FROM node:latest

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 4173

CMD ["npm", "run", "preview"]