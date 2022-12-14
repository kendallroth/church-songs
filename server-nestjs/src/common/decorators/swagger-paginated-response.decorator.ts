import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

import { PaginatedResult } from "@common/types/pagination.dto";

import type { Type } from "@nestjs/common";

/**
 * Apply paginated result decorator to Swagger document
 *
 * NestJS Swagger does not support parsing generic types via Swagger plugin, requiring manual
 *   configuration.
 *
 * NOTE: 'TModel' type will be properly parsed by the Swagger plugin (comments, etc), but only
 *         because it is included as an "extra" Swagger model (via auto-applied decorator)!
 *
 * @source https://docs.nestjs.com/openapi/operations#advanced-generic-apiresponse
 * @example
 * ＠ApiPaginatedResponse(Account)
 * async getAccounts(...args): Promise<PaginatedResult<Account>> { ... }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    // NOTE: Must ensure the model is included in Swagger documentation generation, as if it was not
    //         picked up by any other endpoints it would be missing from document!
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `${model.name}Paginated`,
        allOf: [
          { $ref: getSchemaPath(PaginatedResult) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
