const FORM = document.getElementById("formLogin");

FORM.addEventListener("submit", e => {controllo(e)});

function controllo(e){
    const FORMDATA = new FormData(FORM);

    if(FORMDATA.get("nome") == "" || FORMDATA.get("password") == "") {
        alert("CAMPI VUOTI");
        e.preventDefault();
    }else{
        if(FORMDATA.get("scelta") == "0"){
            alert("SCEGLI COSA FARE");
            e.preventDefault();
        }
    }
}