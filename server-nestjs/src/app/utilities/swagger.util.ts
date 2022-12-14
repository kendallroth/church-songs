import fs from "fs";
import path from "path";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { swaggerApplyNoSecurity } from "@common/decorators";
import { PaginatedResult } from "@common/types/pagination.dto";

import type { INestApplication } from "@nestjs/common";

/** Configure and mount Swagger documentation */
export const setupSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Our Songs")
    .setDescription("API documentation for Our Songs project")
    .setVersion("1.0")
    .addTag("app", "App-level meta information")
    .addTag("song-book", "Song book (collections of songs)")
    // .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [PaginatedResult],
  });

  // Remove security from routes decorated with '@ApiNoSecurity' (overrides controller decorator)
  swaggerApplyNoSecurity(swaggerDocument);

  const swaggerOverrideCss = fs.readFileSync(
    path.join(__dirname, "../assets/swagger-override.css"),
    "utf-8",
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  /** Swagger UI plugin to sort schema definitions alphabetically */
  const sortSchemaDefinitionsPlugin = () => ({
    statePlugins: {
      spec: {
        wrapSelectors: {
          definitions:
            (oriSelector: any) =>
            (state: any, ...args: any[]) => {
              // Calculate original selector value and simply sort post-calculation
              let oldReturn = oriSelector(state, ...args);
              oldReturn = oldReturn.sortBy((value: any, key: any) => key);
              return oldReturn;
            },
        },
      },
    },
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  SwaggerModule.setup("docs", app, swaggerDocument, {
    customCss: swaggerOverrideCss,
    swaggerOptions: {
      plugins: [sortSchemaDefinitionsPlugin],
    },
  });
};
