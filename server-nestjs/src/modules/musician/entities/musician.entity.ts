import { createEntityBase, EntityBase } from "@common/entities";

import type { OptionalEntityBase } from "@common/entities";

export class Musician extends EntityBase {
  name: string;
}

export const stubMusician = (data: OptionalEntityBase<Musician>): Musician => ({
  ...createEntityBase(),
  ...data,
});
