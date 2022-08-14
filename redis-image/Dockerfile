# Use an existing docker image as a base
FROM ubuntu


# Download and install dependencies
RUN apt-get update && apt-get install -y redis


# Tell image what to do when it starts as a container
CMD ["redis-server"]