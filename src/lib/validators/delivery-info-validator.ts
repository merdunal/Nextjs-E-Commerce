// src/lib/validators/delivery-info-validator.ts
import { z } from "zod";

export const DeliveryInfoValidator = z.object({
  name: z.string().min(1, { message: "İsim zorunludur." }),
  surname: z.string().min(1, { message: "Soyisim zorunludur." }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası girin." }),
  address: z.string().min(1, { message: "Adres zorunludur." }),
  city: z.string().min(1, { message: "Şehir zorunludur." }),
});

export type TDeliveryInfoValidator = z.infer<typeof DeliveryInfoValidator>;
