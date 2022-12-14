import { ApiProperty } from "@nestjs/swagger";

/**
 * Swagger documentation property to support file uploads as form data
 * @source:https://github.com/nestjs/swagger/issues/167#issuecomment-777303808
 */
export const ApiFileProperty =
  (options?: { isArray: boolean }): PropertyDecorator =>
  (target, propertyKey) => {
    const fileType = {
      type: "file",
      properties: {
        [propertyKey]: {
          type: "string",
          format: "binary",
        },
      },
    };

    if (options?.isArray) {
      ApiProperty({
        type: "array",
        items: fileType,
      })(target, propertyKey);
    } else {
      ApiProperty(fileType)(target, propertyKey);
    }
  };
