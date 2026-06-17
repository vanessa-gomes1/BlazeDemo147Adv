// export default class ConfirmationPage {
class ConfirmationPage {
    constructor(page){
        this.page = page
        this.url = '/confirmation\.php/'
        this.mensagem = 'h1'
        this.preco = 'Amount '
    }
}

module.exports = ConfirmationPage  // padrão para type = commonjs