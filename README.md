# Superheroes API
API to manage superheroes and their superpowers;

## Requirements
* Node.js >= 8.11.0
* PostgreSQL >= 9.6 with PostGIS 2.4 installed and enabled
* Redis >= 4.0
* Optional: Docker and Docker Compose: Stable versions

## Running Superheroes API
### 1) Ensure databases are running
For convenience, you can run the databases using docker container. Ensure that the host ports are available:
```bash
docker-compose up -d
```
To stop the databases:
```bash
docker-compose up -d
```

### 2) Install dependencies
After cloning the repository, move to the main directory and run
```git
npm install
```
In order to `bcrypt` be installed properly, make sure you have installed the SSL libraries in the host machine that will run the application. If you are using a Ubuntu based host, just run:
```bash
apt-get install libssl-dev
```

### 3) Create the environment
Create a file `.env` and set the following variables:

| Variable | Description |
|----------|-------------|
|DB_HOST|Database hostname. Ex.: `127.0.0.1`|
|DB_NAME|Database name|
|DB_PASSWORD|Database password|
|DB_PORT|Database port. Default: `5432`|
|DB_USERNAME|Database username|
|PORT| The default port which the application server listens. Default: `3000`|
|NODE_ENV|Environment to run the application. Accepts `development`, `test` or `production`|

Ex.:
```bash
export NODE_ENV=development
export DB_HOST=127.0.0.1
export DB_NAME=nxtl_shc_api_db
export DB_USER=nxtl
export DB_PASSWORD=nxtl
export DB_PORT=5432
export PORT=3000
```

After the enviroment is set, run:
```bash
source .env
```

### 4) Run the tests
To run tests, use:
```bash
npm test
```

### 5) Start the application with PM2
By default the application uses PM2 as process manager, just run (no additional build steps are required):
```bash
npm start
```

### 6) Stop the application
To stop the application just run:
```bash
npm stop
```
