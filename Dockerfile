FROM node:21 
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
