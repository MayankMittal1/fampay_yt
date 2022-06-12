FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .
RUN npx prisma generate
EXPOSE 6060
CMD [ "npm","run","dev" ]