FROM node:14-alpine
RUN apk add python
COPY package.json package.json  
RUN npm install

# Add your source files
COPY . .  

CMD ENV=prod npm start
