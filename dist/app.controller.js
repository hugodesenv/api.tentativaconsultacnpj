"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const puppeteer_core_1 = require("puppeteer-core");
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async buscarSimplesNacional() {
        const browser = await puppeteer_core_1.default.launch({
            channel: 'chrome',
            headless: false,
        });
        const page = await browser.newPage();
        const URL = 'https://consopt.www8.receita.fazenda.gov.br/consultaoptantes';
        await page.goto(URL);
        await page.waitForSelector('#consultarForm');
        const classCNPJ = 'input.form-control.numeric#Cnpj';
        const inputCnpj = await page.waitForSelector(classCNPJ);
        await this.delay(3000);
        await inputCnpj.type('03652170000149');
        console.log((await inputCnpj.getProperty('value')).jsonValue());
        await this.delay(5000);
        const button = await page.waitForSelector('button.btn.btn-verde.h-captcha');
        await button.click();
        await this.delay(5000);
        const htmlContent = await page.content();
        await this.delay(5000);
        return htmlContent;
    }
    async delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('buscar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "buscarSimplesNacional", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map