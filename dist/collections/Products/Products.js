"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
var config_1 = require("../../config");
var isAdmin_1 = require("../../access/isAdmin");
exports.Products = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: isAdmin_1.isAdmin,
        create: isAdmin_1.isAdmin,
        update: isAdmin_1.isAdmin,
        delete: isAdmin_1.isAdmin,
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "name",
            label: "Ürün adı",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "Ürün açıklaması",
            type: "textarea",
        },
        {
            name: "price",
            label: "Fiyat",
            min: 0,
            max: 100000,
            type: "number",
            required: true,
        },
        {
            name: "category",
            label: "kategori",
            type: "select",
            options: config_1.PRODUCT_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true,
        },
        {
            name: "approvedForSale",
            label: "Product Status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: isAdmin_1.isAdminFieldLevel,
                read: isAdmin_1.isAdminFieldLevel,
                update: isAdmin_1.isAdminFieldLevel,
            },
            options: [
                {
                    label: "Pending verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Denied",
                    value: "denied",
                },
            ],
        },
        {
            name: "priceId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Ürün görselleri",
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: "Görsel",
                plural: "Görseller",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
