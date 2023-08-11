import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    buscarSimplesNacional(): Promise<string>;
    delay(ms: any): Promise<unknown>;
}
