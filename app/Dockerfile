# Use an official Node runtime as a base image
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node image as a base for the production environment
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the build output from the build stage to the working directory in the production environment
COPY --from=build /app/build ./build

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run the app
CMD ["npx", "serve", "-s", "build"]