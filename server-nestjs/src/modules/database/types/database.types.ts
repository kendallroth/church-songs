import type { Musician } from "@modules/musician/entities";
import type { SongBook } from "@modules/song-book/entities";
import type { Song } from "@modules/song/entities";

export interface Database {
  musicians: Map<string, Musician>;
  songs: Map<string, Song>;
  songBooks: Map<string, SongBook>;
}
