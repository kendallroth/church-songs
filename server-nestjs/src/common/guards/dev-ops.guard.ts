import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";

import { authHeadersConfig as _authHeadersConfig } from "@app/config";

import type { CanActivate, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

/** DevOps authentication header */
export const AUTH_HEADER_DEV_OPS = "auth-header-dev-ops";

@Injectable()
export class DevOpsGuard implements CanActivate {
  constructor(
    @Inject(_authHeadersConfig.KEY)
    private readonly authHeadersConfig: ConfigType<typeof _authHeadersConfig>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    const devOpsHeader = request.headers[AUTH_HEADER_DEV_OPS];
    if (devOpsHeader !== this.authHeadersConfig.authHeaderDevOps) {
      throw new UnauthorizedException("Incorrect or missing authorization header");
    }

    return true;
  }
}
