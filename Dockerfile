FROM node

WORKDIR /qrfront

COPY package*.json /qrfront/

RUN npm install 

COPY . /qrfront/

EXPOSE 3000
CMD [ "npm", "start" ]