var divs = document.getElementsByClassName("divAnno");

const presidenti = [
    { nome: "Alessandro Condini", mandato: "1985-1986" },
    { nome: "Alessandro Condini", mandato: "1986-1987" },
    { nome: "Annarosa Molinari", mandato: "1987-1988" },
    { nome: "Paola Matassoni", mandato: "1988-1989" },
    { nome: "Giorgio Bertoldi", mandato: "1989-1990" },
    { nome: "Giorgio Bertoldi", mandato: "1990-1991" },
    { nome: "Edoardo De Abbondi", mandato: "1991-1992" },
    { nome: "Vittorio Dusini", mandato: "1992-1993" },
    { nome: "Claudia Eccher", mandato: "1993-1994" },
    { nome: "Marco Franzinelli", mandato: "1994-1995" },
    { nome: "Claudia Eccher", mandato: "1995-1996" },
    { nome: "Giovanna Orlando", mandato: "1996-1997" },
    { nome: "Sonia Petteni", mandato: "1997-1998" },
    { nome: "Vittorio Cristanelli", mandato: "1998-1999" },
    { nome: "Riccardo Sampaolesi", mandato: "1999-2000" },
    { nome: "Alessia De Abbondi", mandato: "2000-2001" },
    { nome: "Lavinia Sartori", mandato: "2001-2002" },
    { nome: "Francesca Jerace", mandato: "2002-2003" },
    { nome: "Guglielmo Reina", mandato: "2003-2004" },
    { nome: "Maria Emanuela De Abbondi", mandato: "2004-2005" },
    { nome: "Sara Filippi", mandato: "2005-2006" },
    { nome: "Fabiola Jezza", mandato: "2006-2007" },
    { nome: "Alessandro Pallaoro", mandato: "2007-2008" },
    { nome: "Claire Albano", mandato: "2008-2009" },
    { nome: "Arianna Bertagnolli", mandato: "2009-2010" },
    { nome: "Thomas Zobele", mandato: "2010-2011" },
    { nome: "Andrea Codroico", mandato: "2011-2012" },
    { nome: "Stefano Lorenzini", mandato: "2012-2013" },
    { nome: "Stefano Lorenzini", mandato: "2013-2014" },
    { nome: "Biagio Andrea Algieri", mandato: "2014-2015" },
    { nome: "Davide H. Ciminelli", mandato: "2015-2016" },
    { nome: "Oscar Pallaoro", mandato: "2016-2017" },
    { nome: "Costance Giovannini", mandato: "2017-2018" },
    { nome: "Annalisa De Pretis", mandato: "2018-2019" },
    { nome: "Elisabetta Toller", mandato: "2019-2020" },
    { nome: "Federica Berlanda", mandato: "2020-2021" },
    { nome: "Jessica De Ponto", mandato: "2021-2022" },
    { nome: "Elisabetta Tomasi", mandato: "2022-2023" },
    { nome: "Lucia del Torre", mandato: "2023-2024" },
    { nome: "Daniele Di Lucrezia", mandato: "2024-2025" },
    { nome: "Matteo Bellè", mandato: "2025-2026" }
];

var i=0;
var ia = 9;
Array.from(divs).forEach(div => {
    div.addEventListener("mouseenter", handleMouseEnter);
    div.addEventListener("mouseleave", handleMouseLeave);

    var anno = parseInt(presidenti[i].mandato.split("-")[0]);
    if ((parseInt(anno/10))%2==1) {
        anno = anno + ia;
        ia -= 2;

        div.setAttribute("data-anno", anno + "-" + (anno + 1));
        div.innerHTML = anno + "-" + (anno + 1);
        div.parentElement.setAttribute("data-anno", anno + "-" + (anno + 1));
    } else {
        ia = 9;

        div.setAttribute("data-anno", presidenti[i].mandato);
        div.innerHTML = presidenti[i].mandato;
        div.parentElement.setAttribute("data-anno", presidenti[i].mandato);
    }
    i ++;
});

creaLineaTempo();




async function creaLineaTempo() {
    const percorso = window.location + "/../../src/presidenti.csv";
    var righeTesto = await caricaPresidenti(percorso);
    var righeT = righeTesto.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(riga => riga.trim() !== '');
    var righe = new Array(0);

    var r;
    for (var i = 0; i < righeT.length; i++) {
        if (!righeT[i].trim() == "") {
            r = righeT[i].split(",");
            righe.push({nome: r[0].trim(), mandato: r[1].trim()});
        }
    }

    var offsetStart = parseInt(righe[0].mandato.split("-")[0].trim())%10;
    var offsetFine = parseInt(righe[righe.length-1].mandato.split("-")[0].trim())%10;
    var nRigheColonna = Math.floor((righe.length+offsetStart)/10);
    if ((righe.length+offsetStart)%10 != 0) {
        nRigheColonna ++;
    }

    costruisciLineaTempo(nRigheColonna, offsetStart, offsetFine, righe);


}

function costruisciLineaTempo(nRighe, offStart, offFine, listaPresidenti) {
    var tabella = document.getElementById("tabTempo");

    costruisciTabella(nRighe, 10, "tabTempo");
    
    listaPresidenti.forEach(presidente => {
        //integrare qui la parte statica in modo che attributi e contenuti siano assegnati dinamicamente;
        //ricordarsi di usare l'offset iniziale, e penso che quello finale sia inutile
    });
}

function costruisciTabella(nR, nC, id) {
    var t = document.getElementById(id);

    for (var i = 0; i < nR; i++) {
        var r = document.createElement("tr");
        for (var j = 0; i < nC; j++) {
            var c = document.createElement("td");
            r.appendChild(c);
        }
        t.appendChild(r);
    }
}

//rifare gestione errori per tutto
async function caricaPresidenti(percorso) {
    const response = await fetch(percorso);
    const testoCSV = await response.text();
    return testoCSV;
}

function handleMouseEnter() {
    var casella = this.parentElement;

    // Evita duplicati se il mouse entra ed esce rapidamente
    if (casella.querySelector('.info-pres-hover')) {
        return; 
    }

    const infoPres = document.createElement('p');
    infoPres.className = 'info-pres-hover'; 
    
    infoPres.innerHTML = showPresidente(this.getAttribute("data-anno"));

    const br = document.createElement('br');
    br.className = 'info-pres-hover';

    casella.appendChild(br);
    casella.appendChild(infoPres);
}

function handleMouseLeave() {
    var casella = this.parentElement;
    const elementiTemporanei = casella.querySelectorAll('.info-pres-hover');

    elementiTemporanei.forEach(el => {
        if (el && el.parentElement === casella) {
            casella.removeChild(el);
        }
    });
}

function showPresidente(a) {
    var msg = "";
    presidenti.forEach(pres => {
        if (pres.mandato === a) {
            msg = pres.nome;
        }
    });

    return msg;
}