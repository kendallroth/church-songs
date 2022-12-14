import { Global, Module } from "@nestjs/common";

import { SongController } from "./controllers";

@Global()
@Module({
  controllers: [SongController],
  exports: [],
  providers: [],
})
export class SongModule {}
