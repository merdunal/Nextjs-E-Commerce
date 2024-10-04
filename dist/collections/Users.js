"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var isAdminOrSelf_1 = require("../access/isAdminOrSelf");
var isAdmin_1 = require("../access/isAdmin");
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "'>Hesab\u0131 do\u011Frula</a>");
            },
        },
    },
    access: {
        read: isAdminOrSelf_1.isAdminOrSelf,
        create: isAdmin_1.isAdmin,
        update: isAdminOrSelf_1.isAdminOrSelf,
        delete: isAdmin_1.isAdmin,
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
    },
    fields: [
        {
            name: "role",
            defaultValue: "user",
            required: true,
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
            access: {
                create: isAdmin_1.isAdminFieldLevel,
                update: isAdmin_1.isAdminFieldLevel,
            },
        },
    ],
};
