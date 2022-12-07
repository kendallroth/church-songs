import { createEntityBase } from "./common";

import type { EntityBase, OptionalEntityBase } from "./common";

export type ReviewRecommendation = "yes" | "no" | "maybe";

export interface Review extends EntityBase {
  userGameId: string;
  rating: number;
  recommendation: ReviewRecommendation;
}

export const stubReview = (data: OptionalEntityBase<Review>): Review => ({
  ...createEntityBase(),
  ...data,
});
