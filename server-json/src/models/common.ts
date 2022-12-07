import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

export interface EntityBase {
  id: string;
  createdAt: string;
}

/** Mark all base entity fields as optional */
export type OptionalEntityBase<T extends EntityBase> = Partial<Pick<T, keyof EntityBase>> &
  WithoutEntityBase<T>;

/** Omit base entity fields from a type */
export type WithoutEntityBase<T extends EntityBase> = Omit<T, keyof EntityBase>;

export const createEntityBase = (override: Partial<EntityBase> = {}): EntityBase => ({
  createdAt: dayjs().toISOString(),
  id: uuid(),
  ...override,
});
