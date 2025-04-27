const jsonServer = require('json-server');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const path = require('path');
const PORT = process.env.PORT || 3001;

server.use(express.static(path.join(__dirname, 'dist')));
server.use(middlewares);
//define route of access
server.use('/api',router);
// catch all routes availbale
server.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});
server.listen(PORT,()=>{
    console.log(`JSON server is running on http://localhost:${PORT}/api`)
    console.log(`Application is running on http://localhost:${PORT}`)
})