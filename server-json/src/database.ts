import {
  stubCollection,
  stubCollectionGame,
  stubGame,
  stubReview,
  stubTag,
  stubUser,
  stubUserGame,
} from "./models";

import type { Collection, CollectionGame, Game, Review, Tag, User, UserGame } from "./models";

export interface Database {
  collections: Collection[];
  collectionGames: CollectionGame[];
  games: Game[];
  reviews: Review[];
  tags: Tag[];
  users: User[];
  userGames: UserGame[];
}

const createUserMap = () => {
  return {
    main: stubUser({
      email: "kendall@kendallroth.ca",
      password: "Passw0rd!",
      username: "kroth",
    }),
    system: stubUser({
      email: "system@example.com",
      password: "",
      username: "system",
    }),
  };
};

const createGameMap = () => {
  return {
    towerRush: stubGame({ name: "Tower Rush", tagIds: ["tower-defense"] }),
    marbleRace: stubGame({ name: "Marble Race", tagIds: ["simulation", "casual"] }),
  };
};

const createCollectionMap = (userMap: ReturnType<typeof createUserMap>) => {
  return {
    uMain_cFavourites: stubCollection({
      name: "Favourites",
      description: null,
      public: true,
      userId: userMap.main.id,
    }),
  };
};

const createTagMap = () => {
  return {
    rpg: stubTag({ code: "rpg", name: "RPG" }),
    simulation: stubTag({ code: "simulation", name: "Simulation" }),
    casual: stubTag({ code: "casual", name: "Casual" }),
    towerDefense: stubTag({ code: "tower-defense", name: "Tower Defense" }),
    firstPerson: stubTag({ code: "first-person", name: "First Person" }),
  };
};

const createUserGamesMap = (
  userMap: ReturnType<typeof createUserMap>,
  gameMap: ReturnType<typeof createGameMap>,
  tagMap: ReturnType<typeof createTagMap>,
) => {
  return {
    uMain_gMarbleRace: stubUserGame({
      gameId: gameMap.marbleRace.id,
      reviewId: null,
      tagIds: [tagMap.casual.id, tagMap.simulation.id],
      userId: userMap.main.id,
    }),
  };
};

const createCollectionGamesMap = (
  collectionMap: ReturnType<typeof createCollectionMap>,
  gameMap: ReturnType<typeof createGameMap>,
) => {
  return {
    uMain_cFavourites_gMarbleRace: stubCollectionGame({
      collectionId: collectionMap.uMain_cFavourites.id,
      gameId: gameMap.marbleRace.id,
    }),
  };
};

const createUserGameReviewMap = (userGameMap: ReturnType<typeof createUserGamesMap>) => {
  return {
    uMain_gMarbleRace: stubReview({
      rating: 8,
      recommendation: "yes",
      userGameId: userGameMap.uMain_gMarbleRace.gameId,
    }),
  };
};

export const createDatabase = (): Database => {
  const userMap = createUserMap();
  const users = Object.values(userMap);

  const collectionMap = createCollectionMap(userMap);
  const collections = Object.values(collectionMap);

  const gameMap = createGameMap();
  const games = Object.values(gameMap);

  const tagMap = createTagMap();
  const tags = Object.values(tagMap);

  const collectionGamesMap = createCollectionGamesMap(collectionMap, gameMap);
  const collectionGames = Object.values(collectionGamesMap);

  const userGamesMap = createUserGamesMap(userMap, gameMap, tagMap);
  const userGames = Object.values(userGamesMap);

  const userGameReviewsMap = createUserGameReviewMap(userGamesMap);
  const userGameReviews = Object.values(userGameReviewsMap);

  return {
    collections,
    collectionGames,
    games,
    tags,
    reviews: userGameReviews,
    users,
    userGames,
  };
};
