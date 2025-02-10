const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const middlewares = jsonServer.defaults();

// Use environment variable for port with a fallback
const port = process.env.PORT || 5000;

// Add CORS middleware
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
}); 