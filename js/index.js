let millisecondiSlide = 3500;

// Usiamo window.onload per assicurarci che tutte le immagini siano caricate
window.onload = () => {
    // 1. Seleziona tutti gli elementi necessari
    const caroselloContainer = document.querySelector('.carosello-container'); // Nuova selezione per l'interazione mouse
    const slidesContainer = document.querySelector('.carosello-slides');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatoriContainer = document.querySelector('.carosello-indicatori');

    const totaleSlides = slides.length;
    let indiceCorrente = 0;
    let autoplayInterval; // Variabile per tenere traccia dell'intervallo

    // 2. Funzione per aggiornare la posizione E L'ALTEZZA del carosello
    function aggiornaCarosello() {
        // A. Gestione scorrimento orizzontale (transform)
        const offset = -indiceCorrente * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        
        // B. Logica per l'altezza dinamica
        const slideAttiva = slides[indiceCorrente];
        
        // Attendi che l'immagine sia completamente renderizzata (a volte necessario)
        const immagineAttiva = slideAttiva.querySelector('img');
        
        // Imposta l'altezza del contenitore slidesContainer
        slidesContainer.style.height = `${immagineAttiva.offsetHeight}px`;

        aggiornaIndicatori();
    }
    
    // 3. Funzione per avanzare alla prossima slide (usata da autoplay e dal pulsante)
    function prossimaSlide() {
        indiceCorrente++;
        if (indiceCorrente >= totaleSlides) {
            indiceCorrente = 0; // Torna alla prima slide (loop infinito)
        }
        aggiornaCarosello();
    }

    // 4. LOGICA AUTOPLAY
    function startAutoplay() {
        // Pulisci qualsiasi intervallo precedente per evitare duplicati
        clearInterval(autoplayInterval); 
        
        // Imposta il nuovo intervallo: avanza ogni 3000 millisecondi (3 secondi)
        autoplayInterval = setInterval(prossimaSlide, millisecondiSlide);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // 5. Gestione Interazione Utente (Mouse Hover)
    // Quando il mouse entra nel carosello, ferma lo scorrimento
    caroselloContainer.addEventListener('mouseenter', stopAutoplay);
    
    // Quando il mouse esce dal carosello, riprendi lo scorrimento
    caroselloContainer.addEventListener('mouseleave', startAutoplay);


    // 6. Funzione per creare e gestire gli indicatori (rimane invariata, ma usa aggiornaCarosello)
    function creaIndicatori() {
        for (let i = 0; i < totaleSlides; i++) {
            const indicatore = document.createElement('span');
            indicatore.classList.add('indicatore');
            if (i === 0) {
                indicatore.classList.add('attivo');
            }
            indicatore.addEventListener('click', () => {
                stopAutoplay(); // Ferma l'autoplay al click
                indiceCorrente = i;
                aggiornaCarosello();
                // NON riavviamo l'autoplay subito dopo il click, lasciamo all'utente il controllo.
            });
            indicatoriContainer.appendChild(indicatore);
        }
    }

    // 7. Funzione per aggiornare la classe 'attivo' sui pallini (rimane invariata)
    function aggiornaIndicatori() {
        document.querySelectorAll('.indicatore').forEach((indicatore, index) => {
            indicatore.classList.remove('attivo');
            if (index === indiceCorrente) {
                indicatore.classList.add('attivo');
            }
        });
    }

    // 8. Gestione dei pulsanti
    nextBtn.addEventListener('click', () => {
        stopAutoplay(); // Ferma l'autoplay al click
        prossimaSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoplay(); // Ferma l'autoplay al click
        indiceCorrente--;
        if (indiceCorrente < 0) {
            indiceCorrente = totaleSlides - 1;
        }
        aggiornaCarosello();
    });
    
    // 9. Inizializzazione:
    aggiornaCarosello(); // Calcola l'altezza iniziale e mostra la prima slide
    creaIndicatori();
    startAutoplay(); // Avvia lo scorrimento automatico!
};