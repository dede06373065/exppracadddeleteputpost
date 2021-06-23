FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm i

ENTRYPOINT [ "npm","start" ]
#CMD ["npm","start"]