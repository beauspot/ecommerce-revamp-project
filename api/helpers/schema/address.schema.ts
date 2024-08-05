import { object, string, TypeOf } from "zod";

export const createAddressSchema = object({
  body: object({
    address: string({
      required_error: "Address is required",
    }),
  }),
});

export type CreateAddressInput = TypeOf<typeof createAddressSchema>;
