import { createEntityBase } from "./common";

import type { EntityBase, OptionalEntityBase } from "./common";

export interface UserGame extends EntityBase {
  gameId: string;
  userId: string;
  reviewId: string | null;
  /** User-provided tags */
  tagIds: string[];
}

export const stubUserGame = (data: OptionalEntityBase<UserGame>): UserGame => ({
  ...createEntityBase(),
  ...data,
});
