class Game {
    constructor(currency = 0,
                die = 0,
                warrior = 0,
                arcanist = 0,
                dragon = 0 )
    {
        this.fps = Math.floor(1000/30);
        this.currency = currency;
        this.die = new PartyMember(die, 10, 1.1);
        this.warrior = new PartyMember(warrior, 50, 1.15);
        this.arcanist = new PartyMember(arcanist, 150, 1.25);
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

    updateCostColors() {
        const party = ["die", "warrior", "arcanist", "dragon"];
        party.forEach(member => {
            if (this.currency > this[member].cost) {
                document.getElementById(member + "Cost").classList.remove("notEnoughFunds");
            }
            else {
                document.getElementById(member + "Cost").classList.add("notEnoughFunds");
            }
        });
    }
};