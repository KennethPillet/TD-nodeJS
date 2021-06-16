const got = require('got');

const baseUrlApi = 'https://the-one-api.dev/v2/';
const apiKey = 'Vcb7x0OJ9xpNbObLPoFA';
const allowedFirstArgs = ['books', 'movies', 'characters'];
const allowedFilters = ['name', 'race', 'realm'];

/**
 * Request and return data
 * @async
 * @param {string} endpoint endpoint to request
 * @param {string} queryParams query parameters to the API url
 */
async function requestApi(endpoint, queryParams) {
    try {
        const response = await got(`${baseUrlApi}/${endpoint}/`, { searchParams: queryParams, headers: { Authorization: `Bearer ${apiKey}` } });
        return (JSON.parse(response.body));
    } catch (e) {
        throw new Error(`Failed to get ${endpoint} data : ${e.message}`);
    }
}
/**
 * Log for books
 * @param {Array}
 */
function getBooks(books) {
    books.docs.forEach((book, index) => (
        console.log(`Book n° ${index + 1}: ${book.name}`)
    ));
}
/**
 * Log for movies
 * @param {Array}
 */
function getMovies(movies) {
    movies.docs.forEach((movie) => (
        console.log(movie.name)
    ));
}
/**
 * @param {JSON Array} characters = request of characters
 * @param {Object} rQuery = querystring
 * @returns used to finish when Nobody is found
 */
function getCharacters(characters, rQuery) {
    const keyName = Object.keys(rQuery);
    const valueName = Object.values(rQuery);

    if (!characters.length) { // si la taille de characters.docs retourne rien === true
        console.log('Nobody found');
        return;
    }
    if (keyName.length < 2) {
        console.log(`All those characters have the ${keyName[0]} ${valueName[0]} (${characters.length})`);
        /* const names = characters.map((character) => character.name).values();
        for (const name of names) {
            console.log(name);
        } */
        const names = characters.map((character) => character.name);
        console.log(names.join(', '));
    } else {
        console.log(`${characters.length} characters found with those criteria`);
        characters.forEach((character) => {
            console.log(`Name : ${character.name}, race ${character.race}, realm: ${character.realm}`);
        });
    }
}
/**
 * @param {Array} queriesData include string to convert
 */
async function getCharactersData(queriesData) {
    const rQuery = {};
    for (const query of queriesData) {
        const [key, value] = query.split('=');
        if (!allowedFilters.includes(key)) {
            const e = new Error(`Unknow field ${key}`);
            throw (e.message);
        }
        if (!value) { // si value est empty ou undefined
            const e = new Error(`Value required for field ${key}`);
            throw (e.message);
        }
        rQuery[key] = value;
    }
    const characters = await requestApi('character', rQuery);

    getCharacters(characters.docs, rQuery);
}
/**
 * Return an error if the args is note recognize in requestFromArgument(args)
 * @param {Array.<Object>} args
 */
function testArgs(args) {
    const firstArgsValues = Object.values(allowedFirstArgs);

    if (args.length < 3) {
        const error = new Error('You must indicate at least one argument');
        throw (error.message);
    }
    if (args[2] !== firstArgsValues) {
        const error = new Error(`First argument must be one of those : ${allowedFirstArgs.join(', ')}`);
        throw (error.message);
    }
}
/**
 * @async
 * @param {Array.<Object>} args
 */
async function requestFromArgument(args) {
    switch (args[2]) {
    case 'books':
        const books = await requestApi('book');
        getBooks(books);
        break;
    case 'movies':
        const movies = await requestApi('movie');
        getMovies(movies);
        break;
    case 'characters':
        const queriesData = args.slice(3);
        getCharactersData(queriesData);
        break;
    default:
        testArgs(args);
        break;
    }
}
/**
 * Represents the action function
 * @async
 */
async function main() {
    const args = process.argv;

    try {
        await requestFromArgument(args);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
main();
