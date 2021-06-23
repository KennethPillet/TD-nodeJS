const got = require('got');

const baseUrlApi = 'https://the-one-api.dev/v2/';

async function requestApi(endpoint, queryParams) {
    const response = await got(`${baseUrlApi}/${endpoint}/`, { searchParams: { ...queryParams } });
    return (JSON.parse(response.body));
}

async function getBooks() {
    const books = await requestApi('book');
    /*
    books.docs.forEach((book, index) => (
        console.log(`Book n° ${index + 1}: ${book.name}`)
    ));
    */
    /* 
    let change = books.docs.map((book, index) =>({
        nb: (index+1),
        name: book.name
    }));
    for (let i= 0; i<change.length; i++){
        let names = change[i].name;
        let nbs = change[i].nb;

        console.log(`${names} est le livre numéro ${nbs}`);
    }
    */
   /*  books.docs.map((book, index) =>{
        const newBook = {
            nb: index + 1,
            name: book.name
        }; 
        console.log(`Book n° ${newBook.nb}: ${newBook.name}`)
        return newBook;
    });  */

    const newBooks = [];
    let index = 0;
    for (const book of books.docs) {
        const newBook = {
            nb: index++,
            name: book.name
        };
        newBooks.push(newBook);
        console.log(`Book n° ${newBook.nb + 1}: ${newBook.name}`)
    }
}

getBooks();
