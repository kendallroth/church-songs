export const createRandomList = <T>(amount: number, createItem: (idx: number) => T): T[] => {
  return new Array(amount).fill(0).map((_, idx) => createItem(idx));
};

export const getRandomFromList = <T>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

export const getRandomFromRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min;
};
