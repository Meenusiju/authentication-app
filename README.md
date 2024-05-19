# Full stack application for user authentication

## This project is created using Nest js for backend + React js for frontend + mongo DB as a database + Tailwind css for styling

# Installation

To run this project locally clone repo [https://github.com/Meenusiju/authentication-app.git] 

We have two folders inside our app (client + server) , so we need to setup both in two terminals

# Client setup

Navigate to client `cd client` and install dependencies

`npm i`

Now we can run the project

`npm run dev`

Run test

`npm run test`

This opens frontend react application is localhost, something like `http://localhost:5173`

# Server setup

Now we can run our backend server application which uses Nest js and mongo db

Navigate to server `cd server` and install dependencies

`npm i`

To run backend app we need mongo db setup, ensure mongo db is in your system by using the command

`brew services list`

This should list mongodb status as running. If not check the installation guide [https://www.mongodb.com/docs/v3.0/tutorial/install-mongodb-on-os-x/]

Add env variables at root folder inside server `.env`

` DATABASE_PORT=27017
DATABASE_NAME=nest_app_db
NODE_ENV=LOCAL
PROD=false
EXPIRE_IN=5d
JWT_SECRET=mysecretkey
CLIENT_URI=http://localhost:5173 `

ensure CLIENT_URI same is the one that your react app runs locally

Now you can run server app using 

`npm run dev:start`

Check postman if http methods sends and recieves proper response

Now we can test our application 

Register app with user name, email and password 

Throws error if password is not string

After sign up , navigates to welcome page and displays your name. This step stores JWT token in your browser cookies.

You can also update your user name and logout application. 

Login using credentials and check if throws error for invalid user name or password for wrong credentials

After successful login it navigates to welcome page. 

Logged out users cannot access welcome page and it shows not authorized to view this page. 

Test the app using 

`npm run test`


