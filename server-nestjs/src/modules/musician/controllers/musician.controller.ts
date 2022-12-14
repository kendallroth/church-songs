import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ApiPaginatedResponse } from "@common/decorators";
import { PaginationPagePipe, PaginationSizePipe } from "@common/pipes";
import { PaginatedResult } from "@common/types/pagination.dto";
import { cloneArray } from "@common/utilities/clone.util";
import { paginate } from "@common/utilities/pagination.util";
import { DatabaseService } from "@modules/database/services";

import { Musician } from "../entities";

@Controller("/musician")
@ApiTags("musician")
export class MusicianController {
  get database() {
    return this.databaseService.database.data;
  }

  constructor(private readonly databaseService: DatabaseService) {}

  /** Filterable list of all musicians */
  @Get("/")
  @ApiPaginatedResponse(Musician)
  getMusicianList(
    @Query("page", PaginationPagePipe) page: number,
    @Query("size", PaginationSizePipe) size: number,
  ): PaginatedResult<Musician> {
    const allMusicianRefs = Array.from(this.database.musicians.values());
    const allMusicians: Musician[] = cloneArray(allMusicianRefs);

    return paginate(allMusicians, { page, size });
  }
}
