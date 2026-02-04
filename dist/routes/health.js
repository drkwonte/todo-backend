"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthRouter = createHealthRouter;
const express_1 = require("express");
const env_1 = require("../config/env");
function createHealthRouter() {
    const router = (0, express_1.Router)();
    router.get('/health', (_req, res) => {
        res.status(200).json({
            ok: true,
            env: env_1.env.nodeEnv,
        });
    });
    return router;
}
