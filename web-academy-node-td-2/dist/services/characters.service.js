"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacters = exports.getCharacter = void 0;
const character_1 = require("../model/character");
const comicsGateway = require("../services/comicsGateway.service");
async function getCharacter(url, query) {
    const data = await comicsGateway.getOneCharacterData(url, query);
    const character = data.results;
    return new character_1.Character(character);
}
exports.getCharacter = getCharacter;
async function getCharacters(url, query) {
    const { sortBy, order, filter } = query;
    const data = await comicsGateway.getCharactersData(url, { sortBy, order, filter });
    const characters = data.results;
    return characters;
}
exports.getCharacters = getCharacters;
//# sourceMappingURL=characters.service.js.map