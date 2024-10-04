"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
var zod_1 = require("zod");
var trpc_1 = require("./trpc");
exports.paymentRouter = (0, trpc_1.router)({
    createSession: trpc_1.privateProcedure
        .input(zod_1.z.object({ productIds: zod_1.z.array(zod_1.z.string()) }))
        .mutation(function (_a) {
        var ctx = _a.ctx, input = _a.input;
        var user = ctx.user;
        var productIds = input.productIds;
    }),
});
