import { paginate } from "../pagination.util";

import type { PaginatedResult } from "@common/types/pagination.dto";

describe("Add pagination to query results", () => {
  const makeItems = (amount: number) =>
    new Array(amount).fill(0).map(() => ({
      id: 1,
      name: "First item",
    }));

  test("calculates single page pagination", () => {
    const items = makeItems(2);
    const itemsPaginationInput = {
      page: 1,
      size: 10,
      total: items.length,
    };

    const output = paginate(items, itemsPaginationInput);

    const expected: PaginatedResult<typeof items[0]> = {
      data: items,
      pagination: {
        page: itemsPaginationInput.page,
        size: itemsPaginationInput.size,
        totalItems: itemsPaginationInput.total,
        totalPages: 1,
      },
    };

    expect(output).toStrictEqual(expected);
  });

  test("calculates multiple page pagination", () => {
    const items = makeItems(51);
    const itemsPaginationInput = {
      page: 2,
      size: 10,
    };

    const output = paginate(items, itemsPaginationInput);

    const expected: PaginatedResult<typeof items[0]> = {
      data: items.slice(
        itemsPaginationInput.page * (itemsPaginationInput.page - 1),
        itemsPaginationInput.page * (itemsPaginationInput.page - 1) + itemsPaginationInput.size,
      ),
      pagination: {
        page: itemsPaginationInput.page,
        size: itemsPaginationInput.size,
        totalItems: items.length,
        totalPages: 6,
      },
    };

    expect(output).toStrictEqual(expected);
  });
});
