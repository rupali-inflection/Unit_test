//understand the request-response cycle : Mount router --> configure Controller--> write services
import dotenv from "dotenv";
import Application from "./app.js";
dotenv.config();

(async () => {
  const app = Application.instance();
  app.start();
})();

/*
steps->
1. Creating an app instance-Only one
2. adding middleware & mount the routes-Creating router and writing methods to handle
various paths(route handler)
3. Write controller 
4. writing services
5. Linking 
*/



// app.use('/student',studentRoute)

// app.use('/address',addressRoute)

// app.listen(process.env.PORT, () => {
//   console.log(`App is listening on port ${process.env.PORT}`);
// });

/////////////////////////////////////////////////////////
//Request response using core concept of node js

// import { createServer } from 'http';

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
