import { SetMetadata } from "@nestjs/common";

import type { CustomDecorator } from "@nestjs/common";
import type { OpenAPIObject } from "@nestjs/swagger";

/** Indicate that a route has no security (used in conjunction with controller-level auth) */
export const ApiNoSecurity = (): CustomDecorator => SetMetadata("swagger/apiSecurity", ["none"]);

/**
 * Apply "no security" decorator to Swagger document
 *
 * NestJS Swagger does not provide a built-in way to disable security for a route with controller-level
 *   auth decorators. A custom decorator sets route Swagger security level to 'none', which can then
 *   be filtered out before creating the Swagger documentation.
 *
 * @source https://github.com/nestjs/swagger/issues/892#issuecomment-1069549916
 */
export const swaggerApplyNoSecurity = (document: OpenAPIObject) => {
  Object.values(document.paths).forEach((path) => {
    Object.values(path).forEach((method) => {
      if (Array.isArray(method.security) && method.security.includes("none")) {
        method.security = [];
      }
    });
  });
};
