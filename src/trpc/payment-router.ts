import { z } from "zod";
import { privateProcedure, router } from "./trpc";
const Iyzipay = require("iyzipay"); // Use require

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.IYZICO_BASE_URL,
});

export const paymentRouter = router({
  createPayment: privateProcedure
    .input(
      z.object({
        price: z.string(),
        paidPrice: z.string(),
        currency: z.string(),
        basketId: z.string(),
        paymentCard: z.object({
          cardHolderName: z.string(),
          cardNumber: z.string(),
          expireMonth: z.string(),
          expireYear: z.string(),
          cvc: z.string(),
          registerCard: z.string(),
        }),
        buyer: z.object({
          id: z.string(),
          name: z.string(),
          surname: z.string(),
          gsmNumber: z.string(),
          email: z.string(),
          identityNumber: z.string(),
          lastLoginDate: z.string(),
          registrationDate: z.string(),
          registrationAddress: z.string(),
          ip: z.string(),
          city: z.string(),
          country: z.string(),
          zipCode: z.string(),
        }),
        shippingAddress: z.object({
          contactName: z.string(),
          city: z.string(),
          country: z.string(),
          address: z.string(),
          zipCode: z.string(),
        }),
        billingAddress: z.object({
          contactName: z.string(),
          city: z.string(),
          country: z.string(),
          address: z.string(),
          zipCode: z.string(),
        }),
        basketItems: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            category1: z.string(),
            category2: z.string(),
            itemType: z.string(),
            price: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        ...input,
        installment: '1',
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      };

      return new Promise((resolve, reject) => {
        iyzipay.payment.create(request, (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }),
});
