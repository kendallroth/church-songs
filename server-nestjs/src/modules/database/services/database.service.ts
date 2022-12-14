import { Injectable } from "@nestjs/common";
import { Low, Memory } from "lowdb";

import { SeedService } from "./seed.service";

import type { Database } from "../types";

@Injectable()
export class DatabaseService {
  private db: Low<Database>;

  get database() {
    return this.db;
  }

  constructor(private readonly seedService: SeedService) {
    this.initDatabase();

    this.seedService.seedDatabase(this.database, true);
  }

  initDatabase() {
    const adapter = new Memory<Database>();
    const database = new Low(adapter);

    // Populate database with empty shape (otherwise null)
    database.data = {
      musicians: new Map(),
      songs: new Map(),
      songBooks: new Map(),
    };
    database.write();

    this.db = database;
  }
}
