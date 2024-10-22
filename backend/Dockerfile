FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

# Install npm (should be included with Node.js)
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Build the Strapi app
RUN npm run build

# Expose the Strapi port
EXPOSE 1337

# Start the Strapi app
CMD ["npm", "start"]
