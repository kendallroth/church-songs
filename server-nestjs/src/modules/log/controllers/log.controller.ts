import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ApiDevOpsAuth, ApiInternalDocumentation } from "@common/decorators";
import { DevOpsGuard } from "@common/guards";

import { LoggerService } from "../services";

import type { Json } from "@common/types/json.types";

@Controller("/log")
@ApiTags("app")
export class LogController {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext("LogController");
  }

  /** Test all log levels */
  @Get("/test")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(DevOpsGuard)
  @ApiDevOpsAuth()
  @ApiInternalDocumentation()
  @ApiOperation({
    description: "Triggers all log levels to ensure proper logging and configuration.",
  })
  testLogs(): void {
    const error = new Error("Nothing actually happened!");
    const meta: Json = {
      something: "nothing",
    };

    this.logger.critical("Test critical message", error, meta);
    this.logger.error("Test error message", error, meta);
    this.logger.warning("Test warning message", meta);
    this.logger.info("Test info message", meta);
    this.logger.debug("Test debug message", meta);
  }
}
