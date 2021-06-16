"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCharacters = exports.getCharacterByID = void 0;
const ChrServ = require("../services/characters.service");
async function getCharacterByID(request, response) {
    const result = await ChrServ.getCharacter(request.url, request.query);
    response.json(result || { error: 'getHttp return null or undefined' });
}
exports.getCharacterByID = getCharacterByID;
async function getAllCharacters(request, response) {
    const result = await ChrServ.getCharacters(request.route.path, request.query);
    response.json(result || { error: 'getHttp return null or undefined' });
}
exports.getAllCharacters = getAllCharacters;
//# sourceMappingURL=characters.controller.js.map