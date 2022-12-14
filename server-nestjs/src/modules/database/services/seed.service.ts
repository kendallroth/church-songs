import { Injectable } from "@nestjs/common";

import { seedMusicians } from "@modules/musician/entities";
import { seedSongBooks } from "@modules/song-book/entities";
import { seedSongs } from "@modules/song/entities";

import type { Database } from "../types";
import type { Low } from "lowdb";

@Injectable()
export class SeedService {
  seedDatabase(database: Low<Database>, overwrite = true) {
    const musicians = seedMusicians();
    const songBooks = seedSongBooks();
    const songs = seedSongs();

    const seedData: Database = {
      musicians,
      songs,
      songBooks,
    };

    if (overwrite) {
      database.data = seedData;
    } else {
      throw new Error("Non-overwrite seeding not supported yet!");
    }

    database.write();
  }
}
