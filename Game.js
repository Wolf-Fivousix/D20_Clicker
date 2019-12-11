class Game {
    constructor(currency = 0,
                die = 0,
                warrior = 0,
                arcanist = 0,
                dragon = 0 )
    {
        this.fps = Math.floor(1000/10);
        this.currency = currency;
        this.die = new PartyMember(die, 1, 1.05);
        this.warrior = new PartyMember(warrior, 10, 1.15);
        this.arcanist = new PartyMember(arcanist, 76, 1.25);
        this.dragon = new PartyMember(dragon, 300, 1.5);
    }

    changeCurrency(increment) {
        this.currency += increment;
        document.getElementById("currencyCounter").innerHTML = formatNumber(this.currency.toFixed(0));
        return this.currency;
    }


    saveObject() {
        return [
                this.currency,
                this.die.level,
                this.warrior.level,
                this.arcanist.level,
                this.dragon.level
            ];
    }
};