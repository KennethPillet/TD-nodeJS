import * as express from 'express';

export class Server {

  public app!: express.Application;

  public init(): express.Application {
      this.app = express();
      this.app.listen(3000, () => {
        console.log('App listening on port 3000!');
      });
      return this.app;
  }
}
