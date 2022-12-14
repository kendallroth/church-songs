import { Controller, Get, HttpCode, HttpStatus, Redirect } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";

import { ApiInternalDocumentation } from "@common/decorators";

import { AppService } from "../services";
import { ApiInfoResponse } from "../types";

@Controller("/")
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Redirect("info")
  @ApiExcludeEndpoint()
  root(): void {
    // Comment required to avoid 'no-empty-function' ESLint error
  }

  /** API version/deployment information */
  @Get("/info")
  @ApiInternalDocumentation()
  getInfo(): ApiInfoResponse {
    return this.appService.getInfo();
  }

  /** API check for basic health */
  @Get("/healthcheck")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiInternalDocumentation()
  getHealthCheck(): void {
    // Comment required to avoid 'no-empty-function' ESLint error
  }
}
