"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Geçersiz E-posta adresi." }),
    password: zod_1.z
        .string()
        .min(8, { message: "Şifre en az sekiz karakter uzunluğunda olmalı." }),
});
