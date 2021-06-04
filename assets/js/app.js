const modulo = (() => {
    /**
     * 2C: Two of Clubs (Treboles)
     * 2D: Two of Diamonds (Diamantes)
     * 2H: Two of Hearts (Corazones)
     * 2S: Two of Spades (Espadas)
     */

    let deck = [];
    const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
    const types = ["C","D","H","S"]

    let puntosJugador = 0;
    let puntosComputadora = 0;

    // Referencias del html
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");
    const btnNuevo = document.querySelector("#btnNuevo");
    const divCartasJugador = document.querySelector("#jugador-cartas");
    const divCartasComputadora = document.querySelector("#computadora-cartas");
    const puntJugador = document.querySelectorAll("small")[0];
    const puntComputadora = document.querySelectorAll("small")[1];

    // Funcion para crear nuevo deck
    const crearDeck = () => {
        deck = [];
        for (const value of values) {
            for (const type of types) {
                deck.push(`${value}${type}`)
            }
        }
        deck = _.shuffle(deck);
    }

    // Funcion que permite tomar una carta
    const pedirCarta = () => {
        if(deck.length !== 0){
            return deck.pop();
        }
        throw "No hay cartas en el deck";
    }
    
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? 
                    (valor === "A" ? 11 : 10) :
                valor * 1;
    }

    async function wait(ms) {
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
    }

    const turnoComputadora = async (puntosMinimos) => {
        do {
            //setTimeout(() => {
                if(puntosMinimos < 21)
                    await wait(700);
                const carta = pedirCarta();
                puntosComputadora += valorCarta(carta);

                puntComputadora.innerHTML = puntosComputadora;
                crearCartaHTML(carta, false);
            //}, 500);
            if(puntosMinimos > 21){
                break;
            }
        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);
        setTimeout(() => {
            if(puntosComputadora === puntosMinimos){
                Swal.fire({    
                    title: "Empate",
                    text: "Nadie ha ganado",
                    icon: "info"
                });
            }else if(puntosMinimos > 21){
                Swal.fire({    
                    title: "Haz perdido",
                    text: "La computadora ha ganado",
                    icon: "error"
                });
            }else if (puntosComputadora > 21){
                Swal.fire({    
                    title: "¡¡¡Felicidades!!!",
                    text: "Haz ganado!",
                    icon: "success"
                });
            }else{
                Swal.fire({    
                    title: "Haz perdido",
                    text: "La computadora ha ganado",
                    icon: "error"
                });
            }
        }, 100)
    }

    const crearCartaHTML = (carta, jugador = true) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add("carta");
        (jugador ? divCartasJugador : divCartasComputadora).append(imgCarta)
    }
    
    const nuevoJuego = () => {
        crearDeck();
        puntosComputadora = 0;
        puntosJugador = 0;
        divCartasJugador.innerHTML = "";
        divCartasComputadora.innerHTML = "";
        puntJugador.innerHTML = 0;
        puntComputadora.innerHTML = 0;

        btnPedir.disabled = btnDetener.disabled = false;
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta()
        puntosJugador += valorCarta(carta);

        puntJugador.innerHTML = puntosJugador;

        crearCartaHTML(carta);

        if(puntosJugador > 21){
            btnPedir.disabled = btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
            
        }else if(puntosJugador === 21){
            Swal.fire({    
                title: "¡¡¡Felicidades!!!",
                text: "Haz ganado!",
                icon: "success"
            });
            btnPedir.disabled = btnDetener.disabled= true;
        }
    });

    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
    })
    
    btnNuevo.addEventListener("click", () => {
        nuevoJuego();
    })

    return {
        nuevoJuego: nuevoJuego
    };
})()