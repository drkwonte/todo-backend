"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const constants_1 = require("./constants");
function parsePort(rawPort) {
    if (!rawPort)
        return constants_1.DEFAULT_PORT;
    const parsedPort = Number(rawPort);
    const isInteger = Number.isInteger(parsedPort);
    const isValidRange = parsedPort > 0 && parsedPort <= 65535;
    if (!isInteger || !isValidRange)
        return constants_1.DEFAULT_PORT;
    return parsedPort;
}
function parseNodeEnv(rawNodeEnv) {
    if (rawNodeEnv === 'production')
        return 'production';
    if (rawNodeEnv === 'test')
        return 'test';
    return 'development';
}
exports.env = {
    nodeEnv: parseNodeEnv(process.env.NODE_ENV),
    port: parsePort(process.env.PORT),
};
