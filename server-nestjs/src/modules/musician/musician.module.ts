import { Global, Module } from "@nestjs/common";

import { MusicianController } from "./controllers";

@Global()
@Module({
  controllers: [MusicianController],
  exports: [],
  providers: [],
})
export class MusicianModule {}
