let json={
    "bollettini" : [
        {"data": "Ott 2025", "titolo": "Attività 1", "percorso": "C:\\Users\\iacopo.dadamio\\Downloads\\118_SGD_Consumo pasto attività extrascolastiche a scuola.pdf"},
        {"data": "Set 2025", "titolo": "Attività 2", "percorso": "ciao"}
    ]
};

function caricaBollettini(){
    document.getElementById("ultimo-titolo").innerText=json.bollettini[0].titolo;
    document.getElementById("src-titolo").href=json.bollettini[0].percorso;

    let listaBollettini = document.getElementById("lista-scrollabile");

    for(let i=0;i<json.bollettini.length;i++){
        listaBollettini.innerHTML+='<div class="riga-archivio">'+
        '<span class="data-archivio">'+json.bollettini[i].data+'</span>'+
        '<a href="'+json.bollettini[i].percorso+'" class="link-archivio">'+json.bollettini[i].titolo+'</a>'+
    '</div>';
    }
    

}

caricaBollettini();