# Use official nginx image as the base image
FROM nginx:1.20

# Copy the build output to replace the default nginx contents.
ADD dist/davesa /usr/share/nginx/html

# Remove default configuration for nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom config for nginx
COPY devops/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80