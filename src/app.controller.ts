import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import puppeteer from 'puppeteer-core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('buscar')
  async buscarSimplesNacional() {
    const browser = await puppeteer.launch({
      channel: 'chrome',
      headless: false,
    });

    const page = await browser.newPage();

    /*
    await page.setUserAgent(
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    );*/

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

    //await browser.close();

    return htmlContent;
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
