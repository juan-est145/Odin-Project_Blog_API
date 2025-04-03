# Odin Blog API

A repository containing a REST API made with nestjs that provides data for two different React frontends. One meant for reading posts, and the other meant to edit comments and posts. Some of the highlights of this project are authenthication and authorization, role based credentials and CRUD operations.

### Dependencies
To run this project on your own machine, you will need to have installed Nodejs and Postgres. Also, you will need to have created a database for this project and provide .env files for the backend and for the two different frontends.

#### API
The .env file must have the following keys:\
PORT=*The port you want to listen to*\
SECRET=*A secret of your liking*\
DATABASE_URL=*A database url connection with this format* -> "postgresql://USER:PASSWORD@localhost:5432/DATABASE-NAME?schema=public"
UPGRADE_PASSCODE=*The passcode to upgrade your account from user to poster*

#### WRITE frontend
The .env file must have the following keys:\
VITE_API_HOST=*The url of the api. By default it should be http://localhost:3000*\

#### READ frontend
The .env file must have the following keys:\
VITE_API_HOST=*The url of the api. By default it should be http://localhost:3000*\
VITE_WRITE_HOST=*The url of the write frontend. If it was started before the read frontend, by default it should be http://localhost:5174*\

Once all this requirements are satisfied, first start the api by running

```bash
cd API && npm install && npm run start:dev
```

Then start the frontend by running a the root of the project these commands
```bash
cd Frontend/Read && npm install && npm run dev
```
```bash
cd Frontend/Write && npm install && npm run dev
```