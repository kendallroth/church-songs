import { Global, Module } from "@nestjs/common";

import { SongBookController } from "./controllers";

@Global()
@Module({
  controllers: [SongBookController],
  exports: [],
  providers: [],
})
export class SongBookModule {}
