# Use Node.js image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose ports
EXPOSE 3000
EXPOSE 8083

CMD [ "node", "server.js" ]
