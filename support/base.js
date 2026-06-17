const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const HomePage = require('../pages/home.page');
const ReservePage = require('../pages/reserve.page');
const PurchasePage = require('../pages/purchase.page');
const ConfirmationPage = require('../pages/confirmation.page');

class Base {
    async abrir_browser() {
        const browser =  { chromium, firefox, webkit }
        const browser_name = process.env.BROWSER || 'chromium'; // Define o navegador a ser usado, com base na variável de ambiente BROWSER ou padrão para 'chromium'
        this.browser = await browser[browser_name].launch({ headless: process.env.HEADLESS !== 'false' }); // Inicia o navegador selecionado - não vai mostrar o teste acontecendo 
        this.context = await this.browser.newContext({ baseURL: 'https://blazedemo.com' }); // Cria um novo contexto de navegador
        this.page = await this.context.newPage(); // Abre uma nova página no navegador

        this.homePage = new HomePage(this.page); // Instancia a classe HomePage, passando a página do navegador
        this.reservePage = new ReservePage(this.page); // Instancia a classe ReservePage, passando a página do navegador
        this.purchasePage = new PurchasePage(this.page); // Instancia a classe PurchasePage, passando a página do navegador
        this.confirmationPage = new ConfirmationPage(this.page); // Instancia a classe ConfirmationPage, passando a página do navegador

        }
        async fechar_browser() {
            if (this.context) await this.context.close();
            if (this.browser) await this.browser.close();
    
        }

}

setWorldConstructor(Base)