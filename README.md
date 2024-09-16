# Real-Time chat-app
Real-time chat application that implements the following functionality:
- Create Users
- Login page (Auth functionality using JWT)
- Create chat rooms
- Switch between chat rooms
- Send messages in a chat room
- Get Real-time messages (Apollo GraphQL subscriptions, managed with WebSocket)

## Backend Stack
### `NestJS` `TypeScript` `Mongoose` `GraphQL` `Apollo Server` `MongoDB` `JWT`

## Frontend Stack
### `ReactJS` `TypeScript` `TailwindCSS` `Apollo Client`

## To run Backend:

### `cp .env.template .env`
And open .env file and modify environment variables:

```
PORT=4000
DATABASE_URL= // the Mongo DB Atlas connection string
UI_URL='http://localhost:3000'
JWT_SECRET_KEY='secret-key'
NODE_ENV=development
```

### `npm install`
### `npm run start`

Server running on: [http://localhost:4000](http://localhost:4000)

## To run Frontend:

### `cp .env.template .env`
And open .env file and modify environment variables:

```
REACT_APP_GRAPHQL_HTTP_URI='http://localhost:4000/graphql'
REACT_APP_GRAPHQL_WS_URI='ws://localhost:4000/graphql'
```

### `npm install`
### `npm start`

UI running on: [http://localhost:3000](http://localhost:3000)
