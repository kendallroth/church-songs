import { createEntityBase } from "./common";

import type { EntityBase, OptionalEntityBase } from "./common";

export interface User extends EntityBase {
  email: string;
  password: string;
  username: string;
}

export const stubUser = (data: OptionalEntityBase<User>): User => ({
  ...createEntityBase(),
  ...data,
  password: Buffer.from(data.password).toString("base64"),
});
