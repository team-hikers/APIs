FROM node:16

# app DIR
WORKDIR /server/src/app 

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production instead
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]

