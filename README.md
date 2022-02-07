# Chat Application

This is a chat application where users can join channels and send messages.
This project require a database installation to complete; however, the knex.ts query builder is configured for a sample Mysql database.

The back-end is built with **Node.js** using a **MySQL** database.
The front-end is build with React.

- App Functions(https://www.loom.com/share/a09343ce301b462f98f028820847203e)

## Local Installation

Follow the instructions below if you prefer to install the application on your local machine:

1. Install the latest version of [Node.js](https://nodejs.org). This application requires Node.js 4+.

2. Install [MySQL](https://www.mysql.com/) locally 

3. Start MySQL and create a database. ex: app-chat-db.

4. Clone this repository https://github.com/marquisj25/react-node-chat-app.git.

## Setup Backend Instructions

1. Navigate to the **backend** directory and create a `.env` file.
See the `.env.example` file to see what fields are available.

2. Make sure that your database credentials are correct in the `.env` file.

3. Navigate to the **backend** directory and install the project dependencies:

    ```
    npm i
    ```
4. Migrate the database and run seeds
Migrate the database. `knex migrate:latest --knexfile=knex.ts`.

Run the database seeds. `knex seed:run --knexfile=knex.ts`.

5. Type the following command to start the server:
    
    ```
    npm run watch
    ```
    
    The database is automatically populated

## Setup Frontend Instructions

1. Create a `.env` in the `/frontend` directory.

2. See the `.env.example` file to see what fields are available.

3. Install NPM Packages. `npm i`

4. Start the dev server, `npm run start`.


# Features

## Back-End Features
- As a consumer of the API, I can persist my chat messages
- As a consumer of the API, I can persist messages in specific channels I join.
- As a consumer of the API, I can see the list of all the available channels
- As a consumer of the API, I can receive gif suggestions
- As a consumer of the API, I can look up other users and channels

## Front-End Features
- As a User of the web-app, I can see a list of all the channels
- As a User of the web-app, I can join a channel and see the history of it
- As a User of the web-app, I can send messages to a channel after I have joined it
- As a User of the web-app, I can edit my previous messages
- As a User of the web-app, I can search for my previous messages.(Implemented the frontend UI)

# Techs

We're using React, MUI and Socket.io client to handle with chat messages events.

- [Express](https://expressjs.com/fr/)
- [Knex](https://knexjs.org/)
- [Objection](https://vincit.github.io/objection.js/)
- [Socket.io](https://socket.io/)
- [React](https://en.reactjs.org/)
- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [MUI](https://mui.com/)

# Running on browser

Open a browser and access [http://localhost:8000](http://localhost:8000)