import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email({ message: "Geçersiz E-posta adresi." }),
  password: z
    .string()
    .min(8, { message: "Şifre en az sekiz karakter uzunluğunda olmalı." }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
