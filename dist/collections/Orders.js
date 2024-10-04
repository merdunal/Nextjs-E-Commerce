"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var isAdmin_1 = require("../access/isAdmin");
var isAdminOrSelf_1 = require("../access/isAdminOrSelf");
exports.Orders = {
    slug: "orders",
    admin: {
        useAsTitle: "Your Orders",
        description: "A summary of all your orders on DigitalHippo.",
    },
    access: {
        read: isAdminOrSelf_1.isAdminOrSelf,
        update: isAdmin_1.isAdmin,
        delete: isAdmin_1.isAdmin,
        create: isAdmin_1.isAdmin,
    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            access: {
                read: isAdmin_1.isAdminFieldLevel,
                create: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: "user",
            type: "relationship",
            admin: {
                hidden: true,
            },
            relationTo: "users",
            required: true,
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            required: true,
            hasMany: true,
        },
    ],
};
