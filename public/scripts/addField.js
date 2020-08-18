//funcionalidade adicionar novo horário
//procurar o botão, quando clicar no botão, execute isso
document.querySelector("#add-time").addEventListener('click', cloneField )

// ação de clonar o campo 'horário disponível' 
function cloneField (  ){
    
    // colonar todo campo 'horário disponível' (schedule-item).
   const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) /* true ou false*/
    /* 'Node' é todo elemento/tag html no JS. cloneNode copia todo conteúdo desse elemento. */

     //esvazia os campos clonados
    const fields = newFieldContainer.querySelectorAll ('input') /*lista de dados */
    
    //percorre cada campo para limpar
    fields.forEach( function(field){
        //pegar o field do momento e limpa
        field.value = ""   
    })   

    //colocar na página. Onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)

}
    