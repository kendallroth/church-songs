import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";

import { appConfig as _appConfig } from "../config";

import type { ApiInfoResponse } from "../types";

@Injectable()
export class AppService {
  constructor(
    @Inject(_appConfig.KEY)
    private readonly appConfig: ConfigType<typeof _appConfig>,
  ) {}

  /** Helpful debug API information */
  getInfo(): ApiInfoResponse {
    const { releaseDate, releaseHash, version } = this.appConfig.version;

    return {
      releaseDate,
      releaseHash,
      version,
    };
  }
}
