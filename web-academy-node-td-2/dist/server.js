"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
class Server {
    init() {
        this.app = express();
        this.app.listen(3000, () => {
            console.log('App listening on port 3000!');
        });
        return this.app;
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map