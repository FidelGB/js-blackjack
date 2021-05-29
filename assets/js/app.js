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
    const crearDeck = () => {
        for (const value of values) {
            for (const type of types) {
                deck.push(`${value}${type}`)
            }
        }
        deck = _.shuffle(deck);
    }

    crearDeck();
})()