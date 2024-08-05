import { object, string, TypeOf } from "zod";

export const prodWishlistSchema = object({
  body: object({
    prodId: string({
      required_error: "Product Id is required & must be a string",
    }),
  }),
});

export type productWishlistSchema = TypeOf<typeof prodWishlistSchema>;
