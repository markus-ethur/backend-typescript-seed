import { HttpServer } from './http';

export class Application {
  protected httpServer?: HttpServer;

  start(): void {
    this.httpServer = new HttpServer();
    this.httpServer.start();
  }
}
