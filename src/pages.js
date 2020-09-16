const Database = require('./database/db')


const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html") //'render' : usando a renderização do nunjucks
}

async function pageStudy(req, res) {
    const filters = req.query


    //se tiver um ou mais campos vazios, mostre a página vazia somente
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays }) //{x, y, z ...} envia objetos JS para página
    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    //seleciona todas as aulas  e todos os professores (classes) se existir
    //resultado da busca com os critérios definidos em WHERE EXISTS(critérios)
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    //caso haja erro na consulta ao banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        //formata o subject numérico para texto novamente
        proffys.map( (proffy) => {
            proffy.subject = getSubject(proffy.subject)

        } )
        res.render('study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }

}

async function pageGiveClasses(req, res) {
    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    //arruma e armazena em um vetor os dados das aulas vindo da página (req.body)  para  guardar no banco de dados, antes converte o horario em numero.   
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
        
        //mostra uma URL com o 1o professor cadastrado
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
        
        return res.redirect("/study" + queryString )
    } catch (error) {
        console.log(error)
    }    
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}