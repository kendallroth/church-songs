import { createEntityBase } from "./common";

import type { EntityBase, OptionalEntityBase } from "./common";

export interface CollectionGame extends EntityBase {
  gameId: string;
  collectionId: string;
}

export const stubCollectionGame = (data: OptionalEntityBase<CollectionGame>): CollectionGame => ({
  ...createEntityBase(),
  ...data,
});
