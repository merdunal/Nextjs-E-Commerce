"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
var isAdmin_1 = require("../access/isAdmin");
exports.Media = {
    slug: "media",
    hooks: {
        beforeChange: [
            function (_a) {
                var req = _a.req, data = _a.data;
                return __assign(__assign({}, data), { user: req.user.id });
            },
        ],
    },
    access: {
        read: function () { return true; },
        create: isAdmin_1.isAdmin,
        update: isAdmin_1.isAdmin,
        delete: isAdmin_1.isAdmin,
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
    },
    upload: {
        staticURL: "/media",
        staticDir: "media",
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
            },
            {
                name: "card",
                width: 768,
                height: 1024,
                position: "centre",
            },
            {
                name: "tablet",
                width: 1024,
                height: undefined,
                position: "centre",
            },
        ],
        mimeTypes: ["image/*"],
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
    ],
};
