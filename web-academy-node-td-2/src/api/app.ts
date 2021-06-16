import * as express from 'express';
import * as charaCtrl from './controllers/characters.controller';
import { Server } from './server';

const server = new Server();
const app = server.init();

app.get('/', (_request: express.Request, response: express.Response) => {
  response.send('Hello World! I\'m Kenneth i\'m becomming an Web Developper');
});

app.get('/character/:id', charaCtrl.getCharacterByID);
app.get('/characters', charaCtrl.getAllCharacters);
