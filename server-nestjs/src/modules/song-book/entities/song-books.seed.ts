import dayjs from "dayjs";

import { stubSongBook } from "@modules/song-book/entities";

import type { SongBook } from "@modules/song-book/entities";

export const seedSongBookIds = {
  churchHymnal: "b4d6e26b-fa9f-41a3-836f-9b74a5122530",
  hymnalWorshipBook: "48f1a2f2-84b2-49d5-bdec-99221056b133",
  hymnsOfTheChurch: "826ff7e8-e9f5-427c-a7d7-35d1f45d5cfa",
  songsOfFaithAndPraise: "ab326075-cdc3-4ef5-b33e-1eec89a72f76",
  zionsPraises: "512a4d82-0bfe-4357-8573-fa7f6675bbca",
};

export const seedSongBooks = (): Map<string, SongBook> => {
  const songBookList = [
    stubSongBook({
      createdAt: dayjs().subtract(48, "day").toISOString(),
      id: seedSongBookIds.hymnsOfTheChurch,
      image_url: null,
      link: null,
      name: "Hymns of the Church",
    }),
    stubSongBook({
      createdAt: dayjs().subtract(183, "day").toISOString(),
      id: seedSongBookIds.hymnalWorshipBook,
      image_url: null,
      link: null,
      name: "Hymnal: A Worship Book",
    }),
    stubSongBook({
      createdAt: dayjs().subtract(582, "day").toISOString(),
      id: seedSongBookIds.churchHymnal,
      image_url: null,
      link: null,
      name: "Church Hymnal",
    }),
    stubSongBook({
      createdAt: dayjs().subtract(128, "day").toISOString(),
      id: seedSongBookIds.songsOfFaithAndPraise,
      image_url: null,
      link: null,
      name: "Songs of Faith and Praise",
    }),
    stubSongBook({
      createdAt: dayjs().subtract(249, "day").toISOString(),
      id: seedSongBookIds.zionsPraises,
      image_url: null,
      link: null,
      name: "Zion's Praises",
    }),
  ];

  return new Map(songBookList.map((s) => [s.id, s]));
};

export const seededSongBooks = seedSongBooks();
