# Install

- To install check official website

#

## Check Version

- docker version

# First Docker command

- in terminal enter _docker run hello-world_
- When we entered _docker run hello-world_, it meant that we wanted to startup a new container using the image with the name _hello-world_
- The hello-world program has a tiny little program whose job is to print out some message that will introduce you to how _docker run_ works
- When command was entered in terminal using the _docker client_, it sent the request to the _docker server_ who searched through the local computer to see weather there is a local copy of that particular container. If it exists, then it will run it, else it will search for it in the _docker hub_ and clone it(save it in the _image cache_), then run it(_run an instance of that image as a container_).
  - The _docker hub_ is a repository of free public _images_ that you can freely access and download and run run on your local computer.

# Containers and Images

- An **Image** is a single file with all the dependencies and configurations required to run a program.

  - It is a snapshot of the file system, along with a specific startup. (eg, an image containing a snapshot of chrome, or node js, as a file system and a command to start node js or chrome. )

- A **Container** is an instace of an Image. It runs as a program.
  - it is a running process along with a subset of physical resources on your computer that are allocated to that process specifically.

# Docker Client / CLI

- We can use it to run docker commands

## Creating and Running Container from an Image

- command: _docker run <image-name>_
  - docker run hello-world

### Container Lifecycle

- When we run the command _docker run <image-name>_, the docker client actually runs two commands in the background
  - _docker create_ => to create a container
  - _docker start -a <random-id-obtained-from-preveious-command>_ => used to start a container
    - The _-a_ is to tell docker to watch out for output from that command.

### Overidding Default Response after Running a Docker Command

- We can call specific commands that are available as a program in an Image when starting a container
- Example _docker run busybox echo Hello World_ or _docker run busybox echo Hello_
- Note: We are able to run the above commands because the _busybox_ imag has in it the _echo_ and _ls_ commands. We cannot use those commands in our _helloo-world_ image because they do not exist in it

### Listing Running Containers

- Command: _docker ps_
  - the above images we ran will run immediately and close, so we can see any running container, we can simulate it by running: _docker run busybox ping google.com_. Thar will continue pinging google.com, now we can run _docker ps_ in a seperate window and see the output.

#### List all Containers that have been created

- command: _docker ps --all_

### Restarting an already stopped container

- We can use the _docker ps --all_ command to list all containers, then we can use the id if the container we want to restat and run _docker start <id-of-container>_

### Deleting Stopped Containers

- After working with container, they are still stored in your harddisk, to delete them we run:
  - _docker system prune_

### View Container Logs

- To view logs of a particular container, we can use the _docker logs <id-of-container>_
  - Note: This does not rerun the container but it just prints the logs of a particular container

### Stopping Running Containers

- To stop a running container, we can use two commands: _docker stop <id-of-container>_ or _docker kill <id-of-container>_
  - **doccker stop** => when used, sends in a _SIGTERM_ to the container. This will allow the container some time to finisup some configurations and do some system cleanups before terminating the process, It send in a signal termination. _This will give the running process addidtional time to shut itself down_
  - **doccker kill** => when used, sends in a _SIGKILL_ to the container. This will immediately kill the container and not wait for it to save or do any additional stuff.
  - Note: _docker stop_ when run by default only gives the container 10 seconds to shutdown, but after 10seconds and the container still does not stop, the command fallsback to the _docker kill_ command.

### Running Multiple commands for one Container

- We can execute a command when we are starting or running a container,
- but inorder to run another command in a container after the container has already started,
- We can use the _docker exec -it <id-of-container> command_ .
  - _exec_ => means execute
  - _-it_ => means **in terminal** => it allows you to be able to enter commands in the terminal after the command you run is completed and format it in a readable way.
    - if you do not specify, the cmmand will run but it wont allow you to enter interminal commands if it is required.
    - in general it is _-i_=>for input and _-t_=> to format the text, but we can combine both...
- Example will be running bot redis server and redis client:
  - _docker run redis_ => to run the redis server
  - _docker ps_ => to see list of running processes, then copy id of redis container
  - _docker exec <id-of-container> redis-cli_ => to run the redis client(cli)

# Processes in Linux

- Since docker runs on the linux kernel, we need to understand how the linu processes work.
- Every process we create in a linux environment has three different communication channels attached to it:
  - **1-STDIN:** => Standard in ==> used to communucate information into the process.
    - You type stuff in your terminal, it is being passed on to the STDIN, eg: _docker run redis-cli_
  - **2-STDOUT:** => Standard out ==> used to communucate information out of the process.
    - It is attached to any given process to convey information that is coming from the process.
    - eg: what will showup from a successful _result of running docker run redis-cli_
  - **3-STDERR:** => Standard error => used to communucate information out of the process when error occurs.
    - It is attached to any given process to convey information when error occue=rs from executed command.
    - eg: what will showup from a none successful _result of running docker run redis-cli_

# Accessing Shell / Comand Prompt from Container

- In order to access the comand prompt of a container, you need run: _docker exec -it <id-of-container> sh_
  - _sh_ there means _shell_=> it is a program in the container that we can execute, some containers will also have another command processor as a program like the bash command prompt installed, if so, you can also access the bash command directly.
- We can also start a container and change the default command to show the shell at first run: _docker run -it busybox sh_

# Creating Docker Images

- To create a docker image, we need to:
  - create a _Dockerfile_ => contains configurations that define how our container should behave.
    - inside of every docker file we have to specify the _base image_
    - add additional configuration to _run some commands to install additional programs_
    - specify a command to run on container startup
  - Then we pass it on to the _docker client(cli)_
  - The docker client will then pass it to the docker server
  - The docker server does the work :
    - it takes the docker file,
    - Look at all the lines of configurations that we have inside of it,
    - and then build a usable image that can then be used to startup a new container
-

```dockerfile
# Use an existing docker image as a base
FROM ubuntu


# Download and install dependencies
RUN apt-get update && apt-get install -y redis


# Tell image what to do when it starts as a container
CMD ["redis-server"]

```

- From the ablove code, we can say that the _FTOM, RUN and CMD_ are instructions and their corresponding commands are called _instructions_
- To run it we navigate to the directory where we have the _Dockerfile_ and run _docker build ._=> build command is what will take a docker file and generate an image out of it. The _dot_=> is refered to as the _build context_=> it is the set of files and folders that belongs to our project.., files and folders we want to wrap in our container.
- After successful build of file, we can use _docker run <id-of-container>_

- **NOTE**: _During the build process, a temporary container is created after the starting of every command, and is renoved after the command is completed_

# Tagging an Image / Making it easier to run

- _docker build -t your-docker-id/repoOrProject-name:version(tag) ._
  - eg: _docker build -t dojgambia/redis:latest ._
- To run we can just say: _docker run dojgambia/redis_

# Creating a simple Web App in Docker

- We can use express to create a simple web app
- We can use the Node Image from the docker hub
- Note that **None of the files in the directory that you have your docker file in in contained in your container by default unless you specify it in the Dockerfile**., to do so we use the _COPY_ insttruction or command
- **COPY** => is used to move files and folders from the file system of our local machine to the file system of the _temporary container_ that is created during the build process. Example:

```dockerfile
COPY ./ ./
#copy everything from our current build context to container
```
