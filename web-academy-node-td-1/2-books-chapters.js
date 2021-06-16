const got = require('got');

const baseUrlApi = 'https://the-one-api.dev/v2/';
const apiKey = 'Vcb7x0OJ9xpNbObLPoFA';

async function requestApi(endpoint, queryParams) {
    const response = await got(`${baseUrlApi}/${endpoint}/`, { searchParams: { ...queryParams }, headers: { Authorization: `Bearer ${apiKey}` } });
    return (JSON.parse(response.body));
}

async function getBooks() {
    return await requestApi('book'); // appel la fonction avec seulement le endpoint en param
}
async function getChapters() {
    return await requestApi('chapter', { limit: 100 }); // appel la fonction le endpoint puis un queryParam en param
}

async function main() {
    const books = await getBooks(); // j'initialise une variable avec les résultats de la requete
    const chapters = await getChapters();

    books.docs.forEach((book, index) => { // book reprensente un objet contenur dans books.docs qui est le résultat de ma requete précedente
        const chaptersData = chapters.docs.map((chapter) => ({ // je crée un copie de ce résultat
            book_id: chapter.book,
            chapterName: chapter.chapterName, // mais je ne recupère que ces elements et je change leur "noms" pour plus de lisibilité
        }));
            /* function filterByID(obj) { //obj = OBJECT
                return obj.book_id === book._id; //return true lorsque cela correspond
            } */
        const nbChapters = chaptersData.filter((obj) => obj.book_id === book._id); // charcatersData est le tableau à parcourir par filter dans la parenthese de filter se trouve la fonction qui va faire office de règle ou simplement écrire la fonction dedans qui correspond à la fonction en comm au dessus
        console.log(`Book n° ${index + 1}: ${book.name} has ${nbChapters.length} chapters`); // affiche dans la console le forEach avec les valeurs précedement initialisées
    });
}
main();
