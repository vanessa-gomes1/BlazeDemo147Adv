export default class ReservePage {

    constructor(page){
        this.page = page
        this.titulo = 'h3'
        this.url = '/reserve\.php/'
    
    }
    async selecionar_voo(voo, companhia){
        await this.page.getByRole('row', { name: `Choose This Flight ${voo} ${companhia}`}).getByRole('button').click()
    }

    async verificar_titulo(origem, destino){
        await this.page.waitForSelector(this.titulo)
        const tituloSecao = await this.page.textContent(this.titulo)

        if(!tituloSecao.includes(`Flights from $[origem] to $[destino]:`)){
            throw new Error('Titulo da pagina Reserve ausente ou diferente do esperado')
        }
    }
   
    async verificar_url(){
        await this.page.waitForSelector(this.titulo)
        // const tituloSecao = await this.page.textContent(this.titulo)

        if(!this.page.toHaveURL(this.url)){
            throw new Error('URL da pagina Reserve ausente ou diferente  do esperado')
        }
    }
}