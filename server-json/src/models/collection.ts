import { createEntityBase } from "./common";

import type { EntityBase, OptionalEntityBase } from "./common";

export interface Collection extends EntityBase {
  name: string;
  description: string | null;
  public: boolean;
  userId: string;
}

export const stubCollection = (data: OptionalEntityBase<Collection>): Collection => ({
  ...createEntityBase(),
  ...data,
});
