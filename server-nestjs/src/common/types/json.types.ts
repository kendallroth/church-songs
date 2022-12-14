// Source: https://stackoverflow.com/a/59370530/4206438

export type JsonPrimitive = string | number | boolean | null | undefined;
export type JsonArray = Array<Json>;
export type JsonObject = { [member: string]: Json };
/** JSON type representation */
export type Json = JsonPrimitive | JsonObject | JsonArray;
