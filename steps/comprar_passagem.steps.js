const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// import { Given, When, Then, And } from '@cucumber/cucumber'
// import HomePage from '../pages/home.page'
// import ReservePage from '../pages/reserve.page'
// import PurchasePage from '../pages/purchase.page'
// import ConfirmationPage from '../pages/confirmation.page'

Given(/que estou no site BlazeDemo/i, async function () {
    await this.page.goto(this.homePage.url)                    // abre o browser neste endereço
    if (this.page) {
        const screenshot = await this.page.screenshot({fullPage: true}) // tira um screenshot da página inicial
        await this.attach(screenshot, 'image/png') // anexa o screenshot ao relatório do teste
    }

    await this.homePage.verificar_mensagem_boas_vindas() // verifica se a mensagem de boas vindas está presente na página inicial
});

When('seleciono a origem como {string}', async function (origem){
    await this.homePage.selecionar_origem(origem) // seleciona a origem
});

When('seleciono o destino como {string}', async function (destino) {
    await this.homePage.selecionar_destino(destino)
    const screenshot = await this.page.screenshot({fullPage: true}) // seleciona o destino
    await this.attach(screenshot, 'image/png') // anexa o screenshot ao relatório do teste
});

// Versão que clica no botão sem texto (Find Flights padrão)
When('clico no botao', async function () {
    await this.homePage.clicar_find_flights()  // clica no botão Find Flights
});

// Versão que clica no botão a partir do texto escrito no botão
When('clico no botao "Find Flights"', async function () {
    await this.homePage.clicar_find_flights('Find Flights')  // clica no botão Find Flights
});

// Exemplo conforme o cenário simples (sem o texto "Find Flights")
// Se for sempre clicar no botão olhando apenas o seletor do botão, não tem necessidade de usar o parâmetro "texto_botao" para identificar qual botão clicar, já que só tem um botão na página inicial. Mas se tiver mais de um botão, aí sim tem necessidade de usar o parâmetro para identificar qual botão clicar.
When('clico no botao "Purchase Flight"', async function () {
    // não precisarei ter recebido o parâmetro, seria só dar instrução de clicar
    await this.purchasePage.comprar_passagem()  // clica no botão Purchase Flight
});

// Cenário simples - verifica a mensagem de cidades de origem e destino
Then('verifico o texto {string}', async function (mensagem_origem_destino) {
    await this.reservePage.verificar_titulo(mensagem_origem_destino) // verifica se o titulo da pagina Reserve tem a mensagem de origem e destino

});

Then('verifico se a url contem {string}', async function (pagina) {
    await expect(this.page).toHaveURL(`/${pagina}\.php`) // verifica se a url contem a palavra "pagina" (ex: reserve, purchase, confirmation)
});

When('seleciono o voo {string} da companhia {string}', async function (voo, companhia) {
    await this.reservePage.selecionar_voo(voo, companhia) // seleciona o voo e a companhia
});

When('preencho o nome como {string}', async function (nome) {
    await this.purchasePage.preencher_nome(nome)
    const screenshot = await this.page.screenshot({fullPage: true})
    await this.attach(screenshot, 'image/png')

});

When('seleciono a bandeira do cartao como {string}', async function (bandeira) {
    await this.purchasePage.selecionar_bandeira(bandeira) // seleciona a bandeira do cartão
});

When('marco a opcao {string}', async function (string) {
    // Não estmos usando o parametro que é recebido neste bloco, pois a opção de lembrar os dados do cartão é a única opção de checkbox que tem na página, então não tem necessidade de usar o parametro para identificar qual checkbox marcar
    await this.purchasePage.marcar_lembrete() // marca a opção de lembrar os dados do cartão
});

Then('se exibe a mensagem de agradecimento {string}', async function (string) {
    await expect(this.page.locator(this.confirmationPage.mensagem)).toHaveText('Thank you for your purchase today!') // verifica se a mensagem de agradecimento está presente na página de confirmação
});

Then('se contém a informacao {string} como {string}', async function (quantia, preco) {
    const linha_preco = await this.page.locator('tr').filter({ has: this.page.locator('td', { hasText: quantia }) })
    await expect(linha_preco).toContainText(preco)

});
// Esquema de cenário - verifica a mensagem contendo as duas cidades que recebe como parametro
Then('verifico o texto "Flights from {string} to {string}:"', async function (origem, destino) {
    await expect(this.page.locator(this.reservePage.titulo)).toHaveText(`Flights from ${origem} to ${destino}:`) // verifica se o titulo da pagina Reserve tem a mensagem de origem e destino
});

Then('verifico o texto Flights from {string} to {string}', async function (origem, destino) {
    await expect(this.page.locator(this.reservePage.titulo)).toHaveText(`Flights from ${origem} to ${destino}:`)
});
