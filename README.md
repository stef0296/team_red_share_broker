# Team Red | Share Broker Application
# Steps to run the project
## Backend
    Project location: backend/
---
    Option 1:
    1. Open a terminal window in the project location
    2. Run `cd backend` in the terminal
    2. Run `npm install` in the terminal
    3. Run `npm start` in the terminal
----
    Option 2:
    * If you use VS code, the `launch.json` configuration is already set up.
    * Run `cd backend` in the terminal
    * Run `npm install` in the terminal, and simply press F5.
    * The project should launch in debug mode for you.
    * This is especially useful if you wish to set breakpoints to analyze the code

## Frontend
    Project location: frontend-stock-broker/
----
    1. Open a terminal window in the project location
    2. Run `cd frontend-stock-broker` in the terminal
    2. Run `npm install` in the terminal
    3. Run `npm start` in the terminal

## Ports used:
* Backend: 4000
* Frontend: 3000
----
# Backend project structure
1. The backend project is built with NodeJS and ExpressJS for API routing with `backend/index.js` being the entry point for the application
2. For API or database connection strings, refer to `backend/.env`.
3. For business logic (BL), refer to the files in the `controller/` directory.
4. The databases and collections are stored in `enums/`.