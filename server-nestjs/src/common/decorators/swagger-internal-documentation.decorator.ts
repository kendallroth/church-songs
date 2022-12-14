import { applyDecorators } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

/** Indicate that a route is for internal/dev use only, and should not be exposed in a production environment */
export const ApiInternalDocumentation = () => {
  return applyDecorators(ApiExcludeEndpoint(process.env.NODE_ENV === "production"));
};
