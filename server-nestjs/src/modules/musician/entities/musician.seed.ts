import { faker } from "@faker-js/faker";

import { createRandomList } from "@common/utilities/random.util";
import { stubMusician } from "@modules/musician/entities";

import type { Musician } from "@modules/musician/entities";

export const randomMusicians = createRandomList<Musician>(50, () =>
  stubMusician({ name: faker.name.fullName() }),
);

export const seedMusicianIds = {
  henryCarey: "0c9cd111-d55c-4c21-b1c0-9af21700c716",
  williamEEvans: "98eb6697-2de7-4ed1-ba70-0f425ae961be",
};

export const seedMusicians = (): Map<string, Musician> => {
  const musicianList = [
    ...randomMusicians,
    stubMusician({ id: seedMusicianIds.henryCarey, name: "Henry Carey" }),
    stubMusician({ id: seedMusicianIds.williamEEvans, name: "William E. Evans" }),
  ];

  return new Map(musicianList.map((m) => [m.id, m]));
};

export const seededMusicianMap = seedMusicians();
export const seededMusicianList = Array.from(seededMusicianMap.values());
