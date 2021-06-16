"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHttp = void 0;
const got_1 = require("got");
const API_URL = 'https://comicvine.gamespot.com/api';
const API_KEY = '563fa75c876c102750c9ff8b38423b3b85f2535d';
async function getHttp(endpoint, queryParams = {}) {
    try {
        const response = await got_1.default(`${API_URL}${endpoint}`, {
            searchParams: {
                ...queryParams,
                api_key: API_KEY,
                format: 'json',
                field_list: 'birth,deck,gender,id,name,publisher,real_name',
            },
        });
        return JSON.parse(response.body);
    }
    catch (error) {
        return { error: error.message };
    }
}
exports.getHttp = getHttp;
//# sourceMappingURL=getCharacter.js.map