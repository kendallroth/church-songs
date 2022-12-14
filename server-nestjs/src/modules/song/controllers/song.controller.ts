import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

import { ApiPaginatedResponse } from "@common/decorators";
import { NotFoundError } from "@common/errors";
import { PaginationPagePipe, PaginationSizePipe, ParamUUIDPipe } from "@common/pipes";
import { PaginatedResult } from "@common/types/pagination.dto";
import { cloneArray, cloneObject } from "@common/utilities/clone.util";
import { paginate } from "@common/utilities/pagination.util";
import { DatabaseService } from "@modules/database/services";

import { SongWithRelations } from "../entities/song.entity";

@Controller("/song")
@ApiTags("song")
export class SongController {
  get database() {
    return this.databaseService.database.data;
  }

  constructor(private readonly databaseService: DatabaseService) {}

  /** Filterable list of all songs */
  @Get("/")
  @ApiPaginatedResponse(SongWithRelations)
  @ApiQuery({ name: "include", required: false })
  getSongList(
    @Query("page", PaginationPagePipe) page: number,
    @Query("size", PaginationSizePipe) size: number,
    @Query("include") include?: string,
  ): PaginatedResult<SongWithRelations> {
    const allSongRefs = Array.from(this.database.songs.values());
    let allSongs: SongWithRelations[] = cloneArray(allSongRefs);

    const includedEntities = include?.split(",") ?? [];
    if (includedEntities.includes("songBook")) {
      allSongs = allSongs.map((song) => ({
        ...song,
        songBook: this.database.songBooks.get(song.songBookId),
      }));
    }

    return paginate(allSongs, { page, size });
  }

  @Get("/:id")
  @ApiQuery({ name: "include", required: false })
  getSong(
    @Param("id", ParamUUIDPipe) id: string,
    @Query("include") include?: string,
  ): SongWithRelations {
    const songRef = this.database.songs.get(id);
    if (!songRef) {
      throw new NotFoundError("Song not found");
    }

    const song: SongWithRelations = cloneObject(songRef);
    const includedEntities = include?.split(",") ?? [];
    if (includedEntities.includes("songBook")) {
      const songBook = this.database.songBooks.get(song.songBookId);
      song.songBook = songBook;
    }

    return song;
  }
}
