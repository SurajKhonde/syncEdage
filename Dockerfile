# Use the official Node.js image as the base image
FROM node:18.19.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including TypeScript)
RUN npm install

# Copy the rest of the application files
COPY . .


# Install TypeScript and ts-node globally (in case it's not installed)
RUN npm install -g typescript ts-node
# Install TypeScript globally (for TypeScript compilation)
RUN npm install -g typescript

# Compile TypeScript files
RUN tsc
# Expose the application port
EXPOSE 8000

# Build TypeScript into JavaScript
RUN tsc

# Command to run your application (run the transpiled JavaScript file)
# Command to run your application
CMD ["node", "dist/app.js"]
