"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOrSelf = void 0;
var isAdminOrSelf = function (_a) {
    var _b;
    var user = _a.req.user;
    if (user) {
        if ((_b = user.role) === null || _b === void 0 ? void 0 : _b.includes("admin")) {
            return true;
        }
        return {
            id: {
                equals: user.id,
            }
        };
    }
    return false;
};
exports.isAdminOrSelf = isAdminOrSelf;
