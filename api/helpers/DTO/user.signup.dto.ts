import { Expose, Exclude} from "class-transformer";

export class SignUpDTO {
  @Expose()
  "firstName": string;

  @Expose()
  "lastName": string;

  @Expose()
  "email": string;

  @Expose()
  "mobileNumber": string;

  @Exclude()
  "password": string;

  @Exclude()
  "role": string;

  @Exclude()
  "isBlocked": boolean;

  @Exclude()
  "cart": string[];

  @Exclude()
  "address": string[];

  @Exclude()
  "wishlists": string[];

  @Exclude()
  "_id": string;

  @Expose()
  "createdAt": Date;

  @Exclude()
  "updatedAt": Date;
}