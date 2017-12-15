# Simple chat using Apollo graphql and react

This is a project only to have fun.
Contains a backend made it with Apollo server, express, and sequelize and the client side build it with react and Apollo client.

The main target of this is learn to use graphql, using the apollo packages. Try to learn the most features that graphql give us, and how solve different issues like pagination, subscriptions, authentication and more.

## Prerequisites

You should need installed:

- Docker
- Docker compose
- Node 9.x
- Npm 5.x
- sequelize cli

## Install

### Server

After clone it go to the `server` folder and run `npm i`.

Create `config.js` and `db/config.js` files.

```
cp config.example.js config.js
```

```
cp db/config.example.js db/config.js
```

Get up database, run:

```
docker-compose up -d
```

Populate database with example data, run:

```
sequelize db:migrate
```

```
sequelize db:seed:all
```

Get up server:

```
npm start
```

### Web App

After clone it go to the `server` folder and run `npm i`.

Get up app:

```
npm start
```

## Use


