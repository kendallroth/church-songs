import * as jsonServer from "json-server";

import { createDatabase } from "./database";

const database = createDatabase();

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(database);
const port = 5000;

// NOTE: Sample of how to change primary key per resource, although not sure about relationships???
/*server.use((req, res, next) => {
  if (req.url.includes("/resourceName/")) {
    // @ts-ignore - Ignore missing types
    router.db._.id = "customId";
  }
  next();
});*/

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON server is running on port '${port}'`);
  console.log(`Server: http://localhost:${port}`);
});
