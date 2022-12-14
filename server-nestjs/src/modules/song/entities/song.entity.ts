import { createEntityBase, EntityBase } from "@common/entities";

import type { OptionalEntityBase } from "@common/entities";
import type { Musician } from "@modules/musician/entities";
import type { SongBook } from "@modules/song-book/entities";

export class Song extends EntityBase {
  songBookId: string;
  title: string;
  /** Song numbers can contain alpha characters */
  number: string;
  // TODO: Consider making this field relational
  // TODO: Consider making this field an array
  composer: Musician;
  // TODO: Consider making this field relational
  // TODO: Consider making this field an array
  lyricist: Musician;
  // TODO: Consider making this an enum or union type
  key: string;
}

export class SongWithRelations extends Song {
  songBook?: SongBook;
}

export const stubSong = (data: OptionalEntityBase<Song>): Song => ({
  ...createEntityBase(),
  ...data,
});
