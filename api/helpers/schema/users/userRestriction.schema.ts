import { object, boolean, TypeOf } from "zod";

export const restrictUserSchema = object({
  body: object({
    isBlocked: boolean({
      required_error: "invalid type",
    }),
  }),
});

export type BlockUserSchema = TypeOf<typeof restrictUserSchema>