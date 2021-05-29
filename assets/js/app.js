(() => {
    /**
     * 2C: Two of Clubs (Treboles)
     * 2D: Two of Diamonds (Diamantes)
     * 2H: Two of Hearts (Corazones)
     * 2S: Two of Spades (Espadas)
     */

    let deck = [];
    const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
    const types = ["C","D","H","S"]

    // Funcion para crear nuevo deck
    const crearDeck = () => {
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
    
    crearDeck();
    const carta = pedirCarta();
    const valor = valorCarta(carta);
    console.log({valor});
})()