class Game {
    // CURRENT BUG:
    // Reloading the page resets the cost back to initial!
    constructor(currency = 0,
                sword = 0,
                shield = 0,
                fireBall = 0 )
    {
        this.currency = currency;
        this.sword = new Skill(sword, 10, 1.15);
        this.shield = new Skill(shield, 76, 1.25);
        this.fireBall = new Skill(fireBall, 300, 1.5);
    }

    changeCurrency(increment) {
        this.currency += increment;
        document.getElementById("currencyCounter").innerHTML = this.currency.toFixed(0);
        return this.currency;
    }

    saveObject() {
        return [this.currency, this.sword.level];
    }
};

this.proto