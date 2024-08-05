import { object, string, TypeOf } from "zod";

export const resetPwdInput = object({
  body: object({
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password is too short - should be 8 characters minimum")
      .max(12, "password must not be more than 12 characters long")
      .regex(
        /[A-Z]/,
        "Password must contain at least one or more uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain at lease one or more lowercase letters"
      )
      .regex(/[0-9]/, "Password must contain at least one or more number")
      .regex(
        /[\W_]/,
        "Password must contain at least one or more special character"
      ),
    confirmPassword: string({
      required_error: "confirm your password",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});


export type ResetPwdInput = TypeOf<typeof resetPwdInput>