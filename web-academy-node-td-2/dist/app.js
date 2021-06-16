"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const charaCtrl = require("./controllers/characters.controller");
const server_1 = require("./server");
const server = new server_1.Server();
const app = server.init();
app.get('/', (_request, response) => {
    response.send('Hello World! I\'m Kenneth i\'m becomming an Web Developper');
});
app.get('/character/:id', charaCtrl.getCharacterByID);
app.get('/characters', charaCtrl.getAllCharacters);
//# sourceMappingURL=app.js.map