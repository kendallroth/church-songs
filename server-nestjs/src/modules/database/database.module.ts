import { Global, Module } from "@nestjs/common";

import { DatabaseService, SeedService } from "./services";

@Global()
@Module({
  exports: [DatabaseService],
  providers: [DatabaseService, SeedService],
})
export class DatabaseModule {}
