###########
# BUILDER #
###########

FROM node:16-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ARG REACT_APP_BASE_URL

# Build the React application
RUN npm run build

#########
# FINAL #
#########

# Use the official nginx image to serve the built application
FROM nginx:alpine

# Copy the built React app from the build stage to the nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
