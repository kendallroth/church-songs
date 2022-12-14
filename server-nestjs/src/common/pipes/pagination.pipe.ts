import { BadRequestException, Injectable } from "@nestjs/common";

import {
  PAGINATION_PAGE_SIZE_DEFAULT,
  PAGINATION_PAGE_SIZE_MAX,
} from "../utilities/pagination.util";

import type { PipeTransform } from "@nestjs/common";

/**
 * Pagination pipe to validate/transform pagination size into valid value
 *
 * @example
 * async getPaginatedList(
 *   ＠Query("size", PaginationSizePipe) size: number,
 * ): Promise<PaginatedResult<any>> { ... }
 */
@Injectable()
export class PaginationSizePipe implements PipeTransform<string, number> {
  /** Transform pagination size query to a valid number */
  transform(value: string): number {
    if (!value) {
      return PAGINATION_PAGE_SIZE_DEFAULT;
    }

    const size = parseInt(value, 10);
    if (isNaN(size)) {
      throw new BadRequestException("Invalid pagination size parameter");
    }

    if (size <= 0) {
      return PAGINATION_PAGE_SIZE_DEFAULT;
    }
    if (size > PAGINATION_PAGE_SIZE_MAX) {
      return PAGINATION_PAGE_SIZE_MAX;
    }
    return size;
  }
}

/**
 * Pagination pipe to validate/transform page into valid value
 *
 * @example
 * async getPaginatedList(
 *   ＠Query("page", PaginationPagePipe) page: number,
 * ): Promise<PaginatedResult<any>> { ... }
 */
@Injectable()
export class PaginationPagePipe implements PipeTransform<string, number> {
  /** Transform pagination page query to a valid number */
  transform(value: string): number {
    if (!value) {
      return 1;
    }

    const page = parseInt(value, 10);
    if (isNaN(page)) {
      throw new BadRequestException("Invalid pagination page parameter");
    }

    return page <= 0 ? 1 : page;
  }
}
