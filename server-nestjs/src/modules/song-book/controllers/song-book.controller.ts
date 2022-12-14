import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { sort } from "fast-sort";

import { ApiPaginatedResponse } from "@common/decorators";
import { NotFoundError } from "@common/errors";
import { PaginationPagePipe, PaginationSizePipe, ParamUUIDPipe } from "@common/pipes";
import { PaginatedResult } from "@common/types/pagination.dto";
import { paginate } from "@common/utilities/pagination.util";
import { DatabaseService } from "@modules/database/services";

import { SongBook } from "../entities";

import type { Song } from "@modules/song/entities";

@Controller("/song-book")
@ApiTags("song-book")
export class SongBookController {
  get database() {
    return this.databaseService.database.data;
  }

  constructor(private readonly databaseService: DatabaseService) {}

  /** Filterable list of all song-books */
  @Get("/")
  @ApiPaginatedResponse(SongBook)
  getInfo(
    @Query("page", PaginationPagePipe) page: number,
    @Query("size", PaginationSizePipe) size: number,
  ): PaginatedResult<SongBook> {
    const allSongBooksRef = Array.from(this.database.songBooks.values());

    const paginatedSongBooks = paginate(allSongBooksRef, { page, size });
    paginatedSongBooks.data = sort(paginatedSongBooks.data).asc((s) => s.name);
    return paginatedSongBooks;
  }

  @Get("/:id")
  getSong(@Param("id", ParamUUIDPipe) id: string): SongBook {
    const songBookRef = this.database.songBooks.get(id);
    if (!songBookRef) {
      throw new NotFoundError("Songbook not found");
    }

    return songBookRef;
  }

  @Get("/:id/song")
  getSongBookSongs(
    @Param("id", ParamUUIDPipe) id: string,
    @Query("page", PaginationPagePipe) page: number,
    @Query("size", PaginationSizePipe) size: number,
  ): PaginatedResult<Song> {
    const songsRef = Array.from(this.database.songs.values()).filter((s) => s.songBookId === id);

    // TODO: Figure out how manipulate paginated data more easily...
    const paginatedSongs = paginate(songsRef, { page, size });
    paginatedSongs.data = sort(paginatedSongs.data).asc((s) => s.number);
    return paginatedSongs;
  }
}
