document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleziona tutti gli elementi della timeline
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Se non ci sono elementi, fermiamo lo script
    if (timelineItems.length === 0) {
        return;
    }

    // 2. Prepara gli elementi per l'animazione
    // Aggiungiamo una classe per nasconderli (sarà il loro stato iniziale)
    // Questo accade solo se il JS è attivo.
    timelineItems.forEach(item => {
        item.classList.add('js-animate-ready');
    });

    // 3. Imposta l'Intersection Observer
    const observerOptions = {
        root: null, // Osserva rispetto al viewport
        rootMargin: '0px 0px -100px 0px', // Attiva l'animazione 100px prima che l'elemento sia completamente visibile
        threshold: 0 // Appena 1 pixel è visibile
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Se l'elemento sta entrando nel viewport
            if (entry.isIntersecting) {
                // Aggiungi la classe 'is-visible' per attivare la transizione CSS
                entry.target.classList.add('is-visible');
                
                // Rimuovi la classe 'ready' (opzionale, ma pulito)
                entry.target.classList.remove('js-animate-ready');
                
                // Smetti di osservare questo elemento dopo che è apparso
                observer.unobserve(entry.target);
            }
        });
    };

    // 4. Crea e avvia l'Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Metti ogni elemento della timeline sotto osservazione
    timelineItems.forEach(item => {
        observer.observe(item);
    });

});