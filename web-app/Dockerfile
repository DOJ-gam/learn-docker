# Use an existing docker image as a base
FROM node:16-alpine


# Copy FILES
COPY ./ ./

# Download and install dependencies
RUN npm install


# Tell image what to do when it starts as a container
CMD ["npm", "start"]