import { createEntityBase } from "./common";

import type { EntityBase, OptionalEntityBase } from "./common";

export interface Tag extends EntityBase {
  code: string;
  name: string;
}

export const stubTag = (data: OptionalEntityBase<Tag>): Tag => ({
  ...createEntityBase(),
  // NOTE: Workaround for json-server to avoid middleware to set 'code' as ID for 'Tag' entity (and modifying TS types)
  id: data.code,
  ...data,
});
