import { applyDecorators } from "@nestjs/common";
import { ApiHeader, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { AUTH_HEADER_DEV_OPS } from "@common/guards";

/** Decorator for routes protected by DevOpsGuard */
export const ApiDevOpsAuth = () =>
  applyDecorators(
    ApiHeader({
      name: AUTH_HEADER_DEV_OPS,
      description: "Dev ops authorization header",
    }),
    ApiUnauthorizedResponse({ description: "Incorrect or missing authorization header" }),
  );
