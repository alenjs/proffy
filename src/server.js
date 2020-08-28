//dados
const proffys = [
    { 
        name:"Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp:"8985462132", 
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject:"Química", 
        cost:"20,00",
        weekday: [0], 
        time_from: [720],
        time_to:[1220] 
    },
    { 
        name:"Daniele Evangelista", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp:"8985462132", 
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject:"Química", 
        cost:"20,00",
        weekday: [1], 
        time_from: [720],
        time_to:[1220] 
    },
    { 
        name:"Mayk Brito", 
        avatar:"https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatsapp:"89987654534", 
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject:"Química", 
        cost:"20,00",
        weekday: [1], 
        time_from: [720],
        time_to:[1220] 
    } 
]

const subjects = [
    "Artes", // 0
    "Biologia", // 1
    "Ciências", // 2
    "Educação física", // 3
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",    
]


//Funcionalidades

function getSubject(subjectsNumber){
    //corrige a posição do array da página que começa em '1' não em zero em subjects
    //'+' é conversão de um número em forma de string
    const position = +subjectsNumber -1  
    return subjects[position] //retorna o nome da matéria
}

function pageLanding (req, res){
    return res.render("index.html") //'render' : usando a renderização do nunjucks
}

function pageStudy (req, res){
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays }) //{x, y, z ...} envia objetos JS para página
}

function pageGiveClasses (req, res){
    const data = req.query
    
    //verifica se 'data' não está vazio.     
    const isNotEmpty = Object.keys(data).length > 0
    
    //se tiver dados adicionar na lista de proffys
    if (isNotEmpty) {
       
        //substitui o numero da matéria pelo nome a ser mostrado na pág
        data.subject = getSubject(data.subject)
       
        //adicionar na lista de proffys (professores), alimentando o banco
        proffys.push(data)
        
        return res.redirect ("/study")
    } 
     
    //senão mostrar a página
    return res.render("give-classes.html", { subjects, weekdays })
}

//Servidor
const express = require('express')
const server = express()

//configurar o nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', { //indica o caminho das páginas
    express:server,
    noCache:true,
}) 

//Início e configuração do servidor 
server
.use(express.static("public"))

//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses )
//Start do servidor
.listen(5500)
