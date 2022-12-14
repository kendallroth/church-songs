import { ApiProperty } from "@nestjs/swagger";

import {
  PAGINATION_PAGE_SIZE_DEFAULT,
  PAGINATION_PAGE_SIZE_MAX,
} from "@common/utilities/pagination.util";

/** Page-based pagination metadata */
export class Pagination {
  /** Current pagination page */
  @ApiProperty({ default: 1, minimum: 1 })
  page!: number;

  /** Page size */
  @ApiProperty({
    default: PAGINATION_PAGE_SIZE_DEFAULT,
    maximum: PAGINATION_PAGE_SIZE_MAX,
    minimum: 1,
  })
  size!: number;

  /** Total number of available items (ie. not just item count of current page!) */
  totalItems!: number;

  /** Total number of available pages */
  totalPages!: number;
}

/** Pagination request params */
export class PaginationQuery {
  /** Requested page size */
  size?: number;
  /** Requested page number */
  page?: number;
}

/**
 * Paginated data with pagination info/links
 *
 * NOTE: Since class uses generics for tying 'data', multiple properties must be replicated for
 *         Swagger documentation (since plugin does not pick up properly with generics).
 */
export class PaginatedResult<T> {
  // NOTE: Apparently decorator is mandatory to prevent odd circular reference error!
  @ApiProperty()
  data!: T[];

  /** Result pagination information */
  pagination!: Pagination;
}
