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
# TODO: Make this use environment variables
EXPOSE 8080

CMD [ "node", "server.js" ]
