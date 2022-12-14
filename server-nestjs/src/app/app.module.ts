import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";

import { UncaughtExceptionFilter } from "@common/filters";
import { DatabaseModule } from "@modules/database/database.module";
import { LogModule } from "@modules/log/log.module";
import { MusicianModule } from "@modules/musician/musician.module";
import { SongBookModule } from "@modules/song-book/song-book.module";
import { SongModule } from "@modules/song/song.module";

import { appConfig, authHeadersConfig } from "./config";
import { AppController } from "./controllers";
import { AppService } from "./services";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [appConfig, authHeadersConfig],
    }),
    DatabaseModule,
    LogModule,
    MusicianModule,
    SongModule,
    SongBookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // NOTE: Need to register uncaught exception filter globally from a module in order to
    //         be able to inject log module dependency!
    // Source: https://docs.nestjs.com/exception-filters#inheritance
    // Source: https://docs.nestjs.com/exception-filters#binding-filters
    {
      provide: APP_FILTER,
      useClass: UncaughtExceptionFilter,
    },
  ],
})
export class AppModule {}
