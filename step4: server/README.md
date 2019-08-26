# Readme

Hey there. I wrote a basic web server with flask, a python framework.

https://flask.palletsprojects.com/en/1.1.x/#

## Setup

Follow these instructions to start the server

1. Go into the server directory:

    `cd my-server`

2. Create a virtual environment for python. This makes it so the requirements of this server don't conflict or screw up those of your machine:

    `python3 -m venv venv`

3. Install the requirements. Python requirements are listed in a file called `requirements.txt`. You can install everything listed here using:

    `pip install -r requirements.txt`

If you don't have pip, do some googling to install this package manager. It will be useful for any other python stuff you do.

4. Run `./runserver.sh`. This really just contains two commands, but this bash file acts as a shortcut ;) . This starts the flask app running. Close the terminal to stop it. The server will by default run on port 5000 of your local host.

## Testing

You can look at the terminal output to see requests come in ,eg `127.0.0.1 - - [25/Aug/2019 23:14:50] "POST /circles HTTP/1.1" 200 -`

The included "frontend" is within index.html. You can use that to interact with the server, or make requests to the server directly. For instance, in a new chrome window go to:

`http://localhost:5000`

You should see a welcome message for the server. Go to 

`http://localhost:5000/circles`

This returns json of all circles stored on the server. This is the same endpoint the app is using!

## Server Code

I split this very basic server into two files, server.py and database.py.

server.py listens for requests on various routes, eg `/circles`. It defines how to respond to each request.

database.py is not actually a database, but an in memory python dictionary. It mocks what an actual database would do, retrieving storing and deleting data. However since it's in memory, if you restart the server your data will be lost.