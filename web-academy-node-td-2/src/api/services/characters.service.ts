import { Character } from '../model/character';
import * as comicsGateway from '../services/comicsGateway.service';


export async function getCharacter(url: string, query: Object): Promise<any> {
    const data = await comicsGateway.getOneCharacterData(url , query);
    const character = data.results ;
    return new Character( character );
}
export async function getCharacters(url: string, query: any): Promise<any> {
    const { sortBy, order, filter } = query;
    const data = await comicsGateway.getCharactersData(url , { sortBy, order, filter } );
    const characters = data.results ;
    return characters;
}

