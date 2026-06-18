const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber')
setDefaultTimeout(30000) // define o tempo limite de um comando em CucumberJS

/*
Existem momentos dentro da execução de um script de teste

Antes de tudo --> BeforeAll

Antes de cada cenário  --> Before 

Executa o cenário de teste

Final de cada cenário --> After

Depois de tudo --> AfterAll
*/

Before(async function (){
    await this.abrir_browser()
})

After(async function () {
    await this.fechar_browser()
})
