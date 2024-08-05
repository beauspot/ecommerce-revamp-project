import { object, string, TypeOf } from "zod";
import validator from "validator";

export const fgtPswdSchema = object({
  body: object({
    email: string({
      required_error: "Your email is required",
    })
      .email("Not a valid email address")
      .refine(validator.isEmail),
  }),
});

export type CreateFgtPwdInput = TypeOf<typeof fgtPswdSchema>;
