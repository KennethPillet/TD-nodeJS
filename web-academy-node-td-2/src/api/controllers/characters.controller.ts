import * as express from 'express';
import * as ChrServ from '../services/characters.service';


export async function getCharacterByID(request: express.Request, response: express.Response): Promise<any> {
    const result: any = await ChrServ.getCharacter(request.url, request.query);
    response.json(result || { error: 'getHttp return null or undefined' });
}

export async function getAllCharacters(request: express.Request, response: express.Response): Promise<any> {
    const result: any = await ChrServ.getCharacters(request.route.path, request.query);
    response.json(result || { error: 'getHttp return null or undefined' });
}
// export async function getAllCharacters(request: express.Request, response: express.Response): Promise<any> {
//     const result: any = await ChrServ.getCharacters(request.route.path, request.query);
//     response.json(result || { error: 'getHttp return null or undefined' });
// }
