window.onload = () => {
    const slidesContainer = document.querySelector('.carosello-slides');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatoriContainer = document.querySelector('.carosello-indicatori');

    const totaleSlides = slides.length;
    let indiceCorrente = 0;

    // 2. Funzione per aggiornare la posizione E L'ALTEZZA del carosello
    function aggiornaCarosello() {
        // A. Gestione scorrimento orizzontale (transform)
        const offset = -indiceCorrente * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        
        // B. **LOGICA PER L'ALTEZZA DINAMICA:**
        const slideAttiva = slides[indiceCorrente];
        
        // Misura l'altezza dell'immagine all'interno della slide attiva
        // Si usa offsetHeight, che include il padding ma qui è 0
        const altezzaImmagine = slideAttiva.querySelector('img').offsetHeight;
        
        // Imposta l'altezza del contenitore slide-wrapper. 
        // Questo fa sì che il carosello si espanda/contragga.
        slidesContainer.style.height = `${altezzaImmagine}px`;

        aggiornaIndicatori();
    }

    // 3. Funzione per creare e gestire gli indicatori (rimane invariata)
    function creaIndicatori() {
        for (let i = 0; i < totaleSlides; i++) {
            const indicatore = document.createElement('span');
            indicatore.classList.add('indicatore');
            if (i === 0) {
                indicatore.classList.add('attivo');
            }
            // Aggiungi un listener per il click sul pallino
            indicatore.addEventListener('click', () => {
                indiceCorrente = i;
                aggiornaCarosello();
            });
            indicatoriContainer.appendChild(indicatore);
        }
    }

    // 4. Funzione per aggiornare la classe 'attivo' sui pallini (rimane invariata)
    function aggiornaIndicatori() {
        document.querySelectorAll('.indicatore').forEach((indicatore, index) => {
            indicatore.classList.remove('attivo');
            if (index === indiceCorrente) {
                indicatore.classList.add('attivo');
            }
        });
    }

    // 5. Gestione dei pulsanti (rimane invariata)
    nextBtn.addEventListener('click', () => {
        indiceCorrente++;
        if (indiceCorrente >= totaleSlides) {
            indiceCorrente = 0;
        }
        aggiornaCarosello();
    });

    prevBtn.addEventListener('click', () => {
        indiceCorrente--;
        if (indiceCorrente < 0) {
            indiceCorrente = totaleSlides - 1;
        }
        aggiornaCarosello();
    });
    
    // Inizializzazione: imposta la slide iniziale (indice 0) e calcola l'altezza
    aggiornaCarosello();
    creaIndicatori();
};