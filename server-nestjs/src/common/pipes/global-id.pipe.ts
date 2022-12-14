import { BadRequestException, Injectable } from "@nestjs/common";
import { validate as is_uuid } from "uuid";

import type { PipeTransform } from "@nestjs/common";

/**
 * Global ID validation pipe
 */
@Injectable()
export class ParamUUIDPipe implements PipeTransform<string> {
  /**
   * Verify that ID is a valid global ID (uuid)
   *
   * @param   value    - Input global ID
   * @param   metadata - Value metadata
   * @returns Global ID
   */
  transform(value: string): string {
    if (!value) {
      throw new BadRequestException("ID is required");
    }

    if (!is_uuid(value)) {
      throw new BadRequestException("Invalid ID parameter");
    }

    return value;
  }
}
