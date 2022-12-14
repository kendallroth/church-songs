import { faker } from "@faker-js/faker";

import {
  createRandomList,
  getRandomFromList,
  getRandomFromRange,
} from "@common/utilities/random.util";
import { capitalizeWords } from "@common/utilities/string.util";
import { seededMusicianList, seededMusicianMap, seedMusicianIds } from "@modules/musician/entities";
import { seedSongBookIds } from "@modules/song-book/entities";
import { stubSong } from "@modules/song/entities";
import { songKeys } from "@modules/song/types";

import type { Song } from "@modules/song/entities";

const randomSongs = createRandomList<Song>(200, () => {
  const title = capitalizeWords(faker.lorem.words(getRandomFromRange(2, 4)));

  return stubSong({
    composer: getRandomFromList(seededMusicianList),
    key: getRandomFromList(songKeys),
    lyricist: getRandomFromList(seededMusicianList),
    // TODO: Need to make this unique within a song book!
    number: `${getRandomFromRange(1, 1000)}`,
    songBookId: getRandomFromList(Object.values(seedSongBookIds)),
    title,
  });
});

export const seedSongIds = {
  hotc1: "1da2a171-37ff-43b0-8911-d02cf536bd4e",
};

export const seedSongs = (): Map<string, Song> => {
  const songList = [
    ...randomSongs,
    stubSong({
      id: seedSongIds.hotc1,
      composer: seededMusicianMap.get(seedMusicianIds.henryCarey),
      key: "F",
      lyricist: seededMusicianMap.get(seedMusicianIds.williamEEvans),
      number: "1",
      songBookId: seedSongBookIds.hymnsOfTheChurch,
      title: "Come, O Thou God of Grace",
    }),
  ];

  return new Map(songList.map((s) => [s.id, s]));
};

export const seededSongMap = seedSongs();
export const seededSongList = Array.from(seededSongMap.values());
