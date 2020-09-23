const server = require('./src/server');

server.listen(process.env.SERVER_PORT || 3000, () => {
  server.appLogger.info(`Server started on port: ${process.env.SERVER_PORT}`);
});

module.exports = server;
