# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application code
COPY . .

# Expose port (change if needed)
EXPOSE 8080

# Start the application
CMD ["npm", "run", "dev"]
