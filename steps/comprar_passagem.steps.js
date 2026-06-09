import { Given, When, Then, And } from '@cucumber/cucumber'
import HomePage from '../pages/home.page'
import ReservePage from '../pages/reserve.page'
import PurchasePage from '../pages/purchase.page'
import ConfirmationPage from '../pages/confirmation.page'

Given('que estou no site BlazeDemo', function () {
    page.goto(HomePage.url)                    // abre o browser neste endereço
    HomePage.verificar_mensagem_boas_vindas() // confirma se a mensagem de boas vindas está presente

});

When('seleciono a origem como {string}', function (origem){
    HomePage.selecionar_origem(origem) // seleciona a origem

});

And('seleciono o destino como {string}', function (destino) {
    HomePage.selecionar_destino(destino) // seleciona o destino
});

// Versão que clica no botão a partir do texto escrito no botão
And('clico no botao {string}', function (texto_botao) {
    HomePage.clicar_find_flights(texto_botao)  // clica no botão Find Flights
});

// Exemplo conforme o cenário simples (sem o texto"Find Flights")
// Se for sempre clicar no botão olhando apenas o seletor
And('clico no botao', function (texto_botao) {
    // Não precisaria ter o recebido o parametro, seria só dar instrução de clicar
    HomePage.clicar_find_flights()  // clica no botão Find Flights

});

// Cenário simples - verifica a mensagem de cidades de origem e destino
Then('verifico o texto {string}', function (mensagem_origem_destino) {
    ReservePage.verificar_titulo(mensagem_origem_destino) // verifica se o titulo da pagina Reserve tem a mensagem de origem e destino

});

Then('verifico se a url contem {string}', function (pagina) {
    expect(page).toHaveURL(`/${pagina}\.php/`) // verifica se a url contem a palavra "pagina" (ex: reserve, purchase, confirmation)
});

When('seleciono o voo {string} da companhia {string}', function (voo, companhia) {
    ReservePage.selecionar_voo(voo, companhia) // seleciona o voo e a companhia
});

When('preencho o nome como {string}', function (nome) {
    PurchasePage.preencher_nome(nome) // preenche o campo nome

});

When('seleciono a bandeira  do cartao como {string}', function (bandeira) {
    PurchasePage.selecionar_bandeira(bandeira) // seleciona a bandeira do cartão
});

When('marco a opcao {string}', function (string) {
    // Não estmos usando o parametro que é recebido neste bloco, pois a opção de lembrar os dados do cartão é a única opção de checkbox que tem na página, então não tem necessidade de usar o parametro para identificar qual checkbox marcar
    PurchasePage.marcar_lembrete() // marca a opção de lembrar os dados do cartão

});

When('clico no botao {string}', function (string) {
    // Não estmos usando o parametro que é recebido neste bloco, pois o botão de comprar passagem é o único botão presente na página, então não tem necessidade de usar o parametro para identificar qual botão clicar
    PurchasePage.comprar_passagem()
})

Then('se exibe a mensagem de agradecimento {string}', function (string) {
    expect(page.locator(ConfirmationPage.mensagem)).toHaveText('Thank you for your purchase today!') // verifica se a mensagem de agradecimento está presente na página de confirmação
});

Then('se contem a informacao {string} como {string}', function (quantia, preco) {
    const linha_preco = page.locator('tr').filter({ has: page.locator('td', { hasText: quantia }) }) // localiza a linha da tabela que tem a quantia de passagens compradas
    expect(linha_preco).toContainText(preco) // verifica se a linha da tabela que tem a quantia de passagens compradas tem o preço correto, que é recebido como parametro
});
// Esquema de cenário - verifica a mensagem contendo as duas cidades que recebe como parametro
Then('verifico o texto "Flights from {string} to {string}:"', function (origem, destino) {
    expect(page.locator(ReservePage.titulo)).toHaveText(`Flights from ${origem} to ${destino}:`) // verifica se o titulo da pagina Reserve tem a mensagem de origem e destino
});
