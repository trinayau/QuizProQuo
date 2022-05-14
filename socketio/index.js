const server = require('./server');

const port = process.env.PORT || 5001;

server.listen(port, () => console.log(`The socket.io server is running on port: ${port}!`));