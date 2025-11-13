const FORM = document.getElementById("formBtn");

const regexNome = new RegExp("[a-zA-Z0-9.]+");
const regexEmail = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}");

FORM.addEventListener("click", e => {controllo(e)});

function controllo (e){
    let nome = document.getElementById("nome_mittente").value;
    let mail = document.getElementById("email_mittente").value;

    if(nome != "" && mail != ""){
        if(!regexEmail.test(nome) && !regexEmail.test(mail)){
            e.preventDefault();
            alert("ERRORE NELLA COMPILAZIONE DEI CAMPI");
        }
    }else{
        e.preventDefault();
        alert("Campi vuoti");
    }

}


