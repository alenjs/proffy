//Servidor
const express = require('express')
const server = express()

const { 
    pageLanding, 
    pageStudy, 
    pageGiveClasses,
    saveClasses 
} = require('./pages')

//configurar o nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', { //indica o caminho das páginas
    express:server,
    noCache:true,
}) 

//Início e configuração do servidor 
server
//recber os dados do req.body
.use(express.urlencoded({extended:true}))
//configurar os arquivos estátivos (css, scripts e imagens)
.use(express.static("public"))

//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses )
.post("/save-classes", saveClasses)
//Start do servidor
.listen(5500)
