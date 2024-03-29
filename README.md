# PostiT
 Post-it allows you to post anything (text, images, video, and/or audio) on a single post-it.

 ## Tech Stack
- Node js
- Express
- Mongoose
- dotenv
- Joi
- Jsonwebtoken
- Bcrypt
- Morgan
- Cors
- Helmet

## Installation
- Clone the [repo](https://github.com/nwachee/PostiT.git) 
- Run `npm install ` in your terminal to install packages in package.json
- Create a `.env file` and fill in values for the following variables: - `MONGO_URI`
- Finally run `npm start` in your terminal


### Endpoints : 
- Healthcheck: `/api/v1/healthcheck` 
    [ GET: Server Health Check ]

 - `user: `
    [ POST: create a new user]  `/api/v1/users`
    [ GET: get all users]  `/api/v1/users`
    [ GET: get a single user] `/api/v1/users/<id>`
    [ GET: get a single user by username] `/api/v1/users/@:username`
    [ PUT: update or replace users] `/api/v1/users/<id>`
    [ DELETE: delete a user] `/api/v1/users/<id>`

 - `posts: `
    [ POST: create a new post]  `/api/v1/posts`
    [ GET: get all posts] `/api/v1/posts`
    [ GET: get a single post] `/api/v1/posts/<id>`
    [ PUT: update or replace a post] `/api/v1/posts/<id>`
    [ DELETE: delete a post] `/api/v1/posts/<id>`
    
 - `comments: `
    [ POST: create a new comment]  `/api/v1/comments`
    [ GET: get all comments] `/api/v1/comments`
    [ GET: get a single comment] `/api/v1/comments/<id>`
    [ PUT: update or replace a comment] `/api/v1/comments/<id>`
    [ DELETE: delete a comment] `/api/v1/comments/<id>`

- `docs: `
   [ GET: get API Documentation] `/api/v1/docs`


- Database Schema : https://dbdesigner.page.link/4vy5rLc9SY2LGKeX8

- API Documentation : https://documenter.getpostman.com/view/23369669/2s93JrvjHv

- API Live Link : https://postee.onrender.com

