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

// Cenário simples
Then('verifico o texto {string}', function (mensagem_origem_destino) {
    ReservePage.verificar_titulo(mensagem_origem_destino) // verifica se o titulo da pagina Reserve tem a mensagem de origem e destino

});

Then('se a url contem {string}', function (string) {

});

When('seleciono o voo {string} da companhia {string}', function (string, string2) {

});

Then('verifico se a url contem {string}', function (string) {

});

When('preencho o nome como {string}', function (string) {

});

When('seleciono a bandeira  do cartao como {string}', function (string) {

});

When('marco a opcao {string}', function (string) {

});

Then('se exibe a mensagem de agradecimento {string}', function (string) {

});

Then('se contem a informacao {string} como {string}', function (string, string2) {

});

Then('verifico o texto "Flights from {string} to {string}:"', function (string, string2) {

});
