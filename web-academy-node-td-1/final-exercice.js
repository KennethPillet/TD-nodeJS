const got = require('got');

/**
 * Request and return data
 * @async
 * @param {string} endpoint endpoint to request
 * @param {string} queryParams query parameters to the API url
 */
async function requestApi(endpoint, queryParams) {
    try {
        const response = await got(`https://the-one-api.dev/v2/${endpoint}`, { searchParams: { ...queryParams }, headers: { Authorization: 'Bearer Vcb7x0OJ9xpNbObLPoFA' } });
        // console.log(response.statusMessage)
        return (JSON.parse(response.body));
    } catch (err) {
        throw new Error(`Failed to get ${endpoint} data : ${err}`);
    }
}
/**
 * @async
 * @param {string} argObject name of the character to filter with query string
 * @returns character's name and ID
 */
async function getCharacter(characterName) {
    if (!characterName) {
        return '';
    }
    try {
        const characters = await requestApi('character', { name: `${characterName}` });
        return {
            name: characters.docs[0].name,
            id: characters.docs[0]._id,
        };
    } catch (err) {
        throw new Error(`${characterName} does not exist or write the full Name beetween "" (check the orthograph too)`);
    }
}
/**
 * check the args to looking for the right movie
 * @param {string} argObject
 */
async function getMovie(movieStrNumber) {
    const allowedMovies = {
        first: 'The Fellowship of the Ring',
        second: 'The Two Towers ',
        third: 'The Return of the King',
    };
    const moviesKeys = Object.keys(allowedMovies);
    if (!movieStrNumber) {
        return '';
    }
    if (!moviesKeys.includes(movieStrNumber)) {
        throw new Error(`Movie argument must be one of those : ${moviesKeys.join(', ')} (only working for the LotR trilogy)`);
    } else {
        const movies = await requestApi('movie', { name: allowedMovies[movieStrNumber] });
        return {
            name: movies.docs[0].name,
            id: movies.docs[0]._id,
        };
    }
}

async function getQuotes({ search, character, movie }) {
    const dialogArray = [];
    let apiQuotes = '';
    if (!movie && !character) {
        apiQuotes = await requestApi('quote');
    } else if (!movie) {
        apiQuotes = await requestApi('quote', { character: character.id });
    } else if (!character) {
        apiQuotes = await requestApi('quote', { movie: movie.id });
    } else if (movie && character) {
        apiQuotes = await requestApi('quote', { character: character.id, movie: movie.id });
    }

    for (const quote of apiQuotes.docs) {
        const { dialog } = quote;
        const quoteCharacterId = quote.character;
        const quoteMovieId = quote.movie;
        let isMatching = true;
        if (
            // si le mot-clé existe PUIS s'il n'est pas inclus dans la citation courante
            (search && !dialog.includes(search))
            // si il y a un prénom du personnage existe dans l'API PUIS si la citation n'est pas dit par ce perso
            || (character && quoteCharacterId !== character.id)
            // si le film existe dans l'API PUIS si la citation n'est pas dit dans ce film
            || (movie && quoteMovieId !== movie.id)
        ) {
            isMatching = false;
        }
        if (isMatching) {
            dialogArray.push({ dialog, quoteCharacterId, quoteMovieId });
        }
    }
    return dialogArray;
}

async function displayResult({ search, character, movie }, array) {
    if (array.length === 0) {
        if (search) {
            throw new Error(`'${search}' does not exist or write the full sentence beetween "" (check the orthograph too)`);
        } else {
            throw new Error(`${character.name} does not talk in ${movie.name} (check the orthograph too)`);
        }
    } else if (array.length >= 10) {
        if (search && character && movie) {
            throw new Error(`Too much results for argument ${search} for character ${character.name} and movie ${movie.name}: ${array.length} quotes found. Be more specific !\n`);
        } else if (search && character) {
            throw new Error(`Too much results for argument ${search} for character ${character.name}: ${array.length} quotes found. Be more specific !\n`);
        } else if (search && movie) {
            throw new Error(`Too much results for argument ${search} for movie ${movie.name}: ${array.length} quotes found. Be more specific !\n`);
        } else if (character && movie) {
            throw new Error(`Too much results for character ${character.name} and movie ${movie.name}: ${array.length} quotes found. Be more specific !\n`);
        } else if (search) {
            throw new Error(`Too much results for argument ${search}: ${array.length} quotes found. Be more specific !\n`);
        } else if (character) {
            throw new Error(`Too much results for character ${character.name}: ${array.length} quotes found. Be more specific !\n`);
        } else if (movie) {
            throw new Error(`Too much results for movie ${movie.name}: ${array.length} quotes found. Be more specific !\n`);
        }
    } else if (search && character && movie) {
        console.log(`\n${array.length} quotes found on the movie ${movie.name} for character ${character.name} with queries ${search}\n`);
    } else if (search && character) {
        console.log(`\n${array.length} quotes found for character ${character.name} with queries ${search}\n`);
    } else if (search && movie) {
        console.log(`\n${array.length} quotes found for movie ${movie.name} with queries ${search}\n`);
    } else if (search) {
        console.log(`\n${array.length} quotes found for queries ${search}\n`);
    } else if (character) {
        console.log(`\n${array.length} quotes found for character ${character.name}\n`);
    } else if (movie) {
        console.log(`\n${array.length} quotes found for movie ${movie.name}\n`);
    }
    for (const dialog of array) {
        const moviesName = {};
        const charactersName = {};
        let apiMovieName = {};
        let apiCharacterName = {};
        let movieName = '';
        let characterName = '';
        if (movie) {
            movieName = movie.name;
        } else if (moviesName[dialog.quoteMovieId]) {
            movieName = moviesName[dialog.quoteMovieId];
        } else {
            apiMovieName = await requestApi(`movie/${dialog.quoteMovieId}`);
            moviesName[dialog.quoteMovieId] = apiMovieName.docs[0].name;
            movieName = moviesName[dialog.quoteMovieId];
        }
        if (character) {
            characterName = character.name;
        } else if (charactersName[dialog.quoteCharacterId]) {
            characterName = charactersName[dialog.quoteCharacterId];
        } else {
            apiCharacterName = await requestApi(`character/${dialog.quoteCharacterId}`);
            charactersName[dialog.quoteCharacterId] = apiCharacterName.docs[0].name;
            characterName = charactersName[dialog.quoteCharacterId];
        }

        console.log (`Character: ${characterName}\nMovie: ${movieName}\nDialog: ${dialog.dialog}\n`);
    }
}

async function main() {
    const args = process.argv.slice(2);
    const argObject = {};
    args.forEach((arg) => {
        if (arg.includes('=')) {
            const [key, value] = arg.split('=');
            argObject[key] = value;
        } else {
            argObject.search = arg;
        }
    });

    const apiCharacter = await getCharacter(argObject.character);
    const apiMovie = await getMovie(argObject.movie);
    const params = {};
    if (argObject.character) {
        params.character = apiCharacter;
    }
    if (argObject.movie) {
        params.movie = apiMovie;
    }
    if (argObject.search) {
        params.search = argObject.search;
    }
    const result = await getQuotes(params);
    await displayResult(params, result);
}
main();

// async function test() {
//     const args = process.argv.slice(2);
//     let argObject = {};
//     args.forEach(arg => {
//         if (arg.includes('=')){
//             const [key, value] = arg.split('=');
//             argObject[key] = value;
//         } else {
//             argObject["search"] = arg;
//         }
//     });
//     console.log(argObject);
//     const response = await got(`https://the-one-api.dev/v2/quote`, { searchParams: {character : '5cd99d4bde30eff6ebccfd0d', movie : '5cd95395de30eff6ebccde5b', dialog: ''}, headers: { Authorization: 'Bearer Vcb7x0OJ9xpNbObLPoFA' } });
//     console.log(JSON.parse(response.body))
// const response = await got(`https://the-one-api.dev/v2/movie/5cd95395de30eff6ebccde5b`, {headers: { Authorization: 'Bearer Vcb7x0OJ9xpNbObLPoFA' } });
// console.log(JSON.parse(response.body))
//     await getQuotes(argObject);
// }
// test()
