"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
function startServer() {
    const app = (0, app_1.createApp)();
    app.listen(env_1.env.port, () => {
        // eslint-disable-next-line no-console
        console.log(`[server] listening on port ${env_1.env.port} (${env_1.env.nodeEnv})`);
    });
}
startServer();
