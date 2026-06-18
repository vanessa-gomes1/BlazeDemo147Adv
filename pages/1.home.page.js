// export default class HomePage { // padrão para type = module

class HomePage {                 // padrão para type = commonjs
    // construtor com o mapeamento de elementos
constructor(page){
        this.page = page     // o objeto do Plawright interno recebe o objeto do Playwright externo
        this.titulo = 'h1'
        this.origem = '[name="fromPort"]'
        this.destino = '[name="toPort"]' //xpath
        this.btnFindFlights = '.btn-primary'
        this.url = 'https://www.blazedemo.com'
    }

    // Mapear as ações
    async selecionar_origem(cidade_origem) {
        await this.page.locator(this.origem).selectOption(cidade_origem)
    }
    async selecionar_destino(cidade_destino) {
        await this.page.locator(this.destino).selectOption(cidade_destino)
    }
    // Clica no botão Find Flights; aceita parâmetro opcional com o texto do botão
    async clicar_find_flights(texto_botao){
        if (texto_botao) {
            await this.page.getByRole('button', { name: texto_botao }).click()
        } else {
            await this.page.locator(this.btnFindFlights).click()
        }
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

module.exports = HomePage  // padrão para type = commonjs