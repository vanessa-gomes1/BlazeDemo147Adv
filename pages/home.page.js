export default class HomePage {
    constructor(page){
        this.page = page     // o objeto do Plawright interno recebe o objeto do Playwright externo
        this.titulo = 'h1'
        this.origem = '[name= "fromPort"]'
        this.destino = '[name= "toPort"]' //xpath
        this.btnFindFlights = '.btn-primary'
        this.url = 'https://www.blazedemo.com'
    }

    // Mapear as ações
    async selecionar_origem(cidade_origem) {
        await this.page.locator(this.origem).selectOption(cidade_origem)
    }
    async slecionar_destino(cidade_destino) {
        await this.page.locator(this.destino).selectOption(cidade_destino)
    }
   // Este seria para o exemplo de clicar no botão sem receber o texto do botão como parâmetro
    async clicar_find_flights(){
        await this.page.locator(this.btnFindFlights).click()
    }

    // Este seria para o exemplo de clicar no botão a partir do texto escrito no botão
    async clicar_find_flights(texto_botao){
        await this.page.getByRole('button', { name: texto_botao }).click()
    }

    // jeito "rebelde" - verificação dentro do mapeamento
    async verificar_mensagem_boas_vindas(){
    // espera o seletor indicado carregar: Texto que serve de título da página
        await this.page.waitForSelector(this.titulo)
    // extrair o texto que estiver no elemento e guardar na constante titulo_pagina
        const titulo_pagina = await this.page.textContent(this.titulo)
        
        // falha
        if(!titulo_pagina.includes('Welcome to the Simple Travel Agency!')){
            throw new Error('Titulo na Home ausente ou diferente do esperado')
        }
    }
}
