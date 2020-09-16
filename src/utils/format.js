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

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split (":")
    return Number( (hour * 60 ) + minutes )
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}