
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
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]


function pageLanding (req, res){
    return res.render("index.html") //'render' : usando a renderização do nunjucks
}

function pageStudy (req, res){
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects }) //{x, y, z ...} passando objetos JS para página
}

function pageGiveClasses (req, res){
    return res.render("give-classes.html")
}

const express = require('express')
const server = express()

//configurar o nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express:server,
    noCache:true,
}) //indica onde estão as pág html



server
/*configuração dos arquivos estáticos (css, scrips, imagens) */
.use(express.static("public"))

/*rotas da aplicação*/
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses )
.listen(5500)
