const express = require('express');

const routes = require('./routes');

const middlewares = require('./middlewares');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', middlewares.validateLogin, routes.login);

app.use('/user', routes.user);

app.use('/categories', routes.category);

app.use('/post', routes.post);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
