import { createEntityBase, EntityBase } from "@common/entities";

import type { OptionalEntityBase } from "@common/entities";

export class SongBook extends EntityBase {
  name: string;
  link: string | null;
  image_url: string | null;
}

export const stubSongBook = (data: OptionalEntityBase<SongBook>): SongBook => ({
  ...createEntityBase(),
  ...data,
});
