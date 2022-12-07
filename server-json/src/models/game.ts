import { createEntityBase } from "./common";

import type { EntityBase, OptionalEntityBase } from "./common";

export interface Game extends EntityBase {
  name: string;
  /** System-defined game tags */
  tagIds: string[];
}

export const stubGame = (data: OptionalEntityBase<Game>): Game => ({
  ...createEntityBase(),
  ...data,
});
