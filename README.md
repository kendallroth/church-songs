# Church Songs

> Simple church song tracking tool.

## Features

- View list of song books
- View list of songs in a book
- Search list of all songs
- Manage lists of songs
- Manage favourite songs
- _Authentication and account management_

## Stack

- [API (fastify)](./server-fastify/README.md)
- [Web (react)](./web-react/README.md)
- Web (vue) - **coming soon??**

## Development

### VS Code

VS Code has been configured to automatically open a set of terminals with the command `Terminals: Run`. This will open a root directory, as well as server and web subfolders and processes (5 in total).

> **NOTE:** Could investigate opening specific server/web directories based on env variables (will require standard commands)...

## Todos

- Share ESLint (as base) and Prettier config between projects

## Caveats

#### Fix ESM in LowDB

`lowdb` is built solely with support for ESM; however, converting the project runs into other issues. Instead, an approach was suggested in [GitHub](https://github.com/typicode/lowdb/issues/471#issuecomment-850908461) for supporting CommonJS. While it was not merged, it still does work as expected.

#### Database Dependency

Due to the way the database seeding relies on model stubs found in the individual modules, module index files must be very careful to properly order dependencies!

```ts
export { Song, stubSongBook } from "./song.model";
export { songRoutes } from "./song.routes";
```

