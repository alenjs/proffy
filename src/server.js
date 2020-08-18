require('express')()
/*get(rota, (função) )
/* função (requisição, resposta)*/ 
.get("/", ( req, res )=>{
    /* return resposta.enviar(mensagem)*/
    return res.send( "Hi from NLW" )
})

.get("/study", (req, res)=>{
    return res.send( "Study" )
})

.listen(5500)

