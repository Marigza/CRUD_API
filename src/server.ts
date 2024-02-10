import http from 'node:http';

const PORT = process.env.PORT || 4000;

const myServer = http.createServer();

myServer.listen(PORT);

console.log(myServer.listening);
