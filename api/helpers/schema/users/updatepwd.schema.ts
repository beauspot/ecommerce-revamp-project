import { object, string, TypeOf } from "zod";

export const updatePassword = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export type UpdatePwdinput = TypeOf<typeof updatePassword>;
