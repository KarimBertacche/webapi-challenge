const express = require('express');
// const actionRouter = require('./data/helpers/actions/actionRouter');
const projectRouter = require('./data/helpers/projects/projectRouter');

const server = express();

server.use('/api/projects', projectRouter);
// server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send('<h1>Don\'t worry, the Server is up and running, be happy 😁</h1>')
});

module.exports = server;