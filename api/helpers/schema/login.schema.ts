import { object, string, TypeOf } from "zod";

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email address"),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
