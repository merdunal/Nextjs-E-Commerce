// src/@types/iyzipay.d.ts
declare module 'iyzipay' {
    export const LOCALE: {
        TR: string;
        EN: string;
    };

    export const PAYMENT_CHANNEL: {
        WEB: string;
        // Add more payment channels if needed
    };

    export const PAYMENT_GROUP: {
        PRODUCT: string;
        // Add more payment groups if needed
    };

    export class Iyzipay {
        constructor(options: { apiKey: string; secretKey: string; uri: string });
        payment: {
            create(request: any, callback: (err: any, result: any) => void): void;
        };
    }
}
