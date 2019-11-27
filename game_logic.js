const SAVE = loadGame();
const game = SAVE ? new Game(...SAVE) : new Game();

function D20Clicker() {
    let roll = Math.ceil(Math.random() * 20);
    game.changeCurrency(roll);
    if(roll < 10) roll = "0" + roll;
    document.getElementById("D20").innerHTML = roll;
}

function levelUp(attribute) {
    if(game[attribute].cost < game.currency) {
        game.changeCurrency(-game[attribute].cost);
        game[attribute].levelUp();
        document.getElementById(attribute + "Level").innerHTML = game[attribute].level;
        document.getElementById(attribute + "Cost").innerHTML = game[attribute].cost;
    }
}

function saveGame() {
    localStorage.setItem("d20Save", game.saveObject());
}

function deleteSave() {
    localStorage.clear();
}

function loadGame() {
    let save = localStorage.getItem("d20Save");
    if (save) {
        save = save.split(",").map(x => parseInt(x));
        return save;
    }
    return null;
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize HTML with Game State.
    document.getElementById("currencyCounter").innerHTML = game.currency;
    document.getElementById("swordLevel").innerHTML = game.sword.level;
    document.getElementById("swordCost").innerHTML = game.sword.cost;
    document.getElementById("shieldLevel").innerHTML = game.shield.level;
    document.getElementById("shieldCost").innerHTML = game.shield.cost;
    document.getElementById("fireBallLevel").innerHTML = game.fireBall.level;
    document.getElementById("fireBallCost").innerHTML = game.fireBall.cost;
        
    setInterval(() => {
        game.changeCurrency(game.sword.level / 10);
        game.changeCurrency(game.shield.level / 10);
        game.changeCurrency(game.fireBall.level / 10);
        const generation = game.sword.level + game.shield.level + game.fireBall.level;
        document.getElementById("currencyPerSecond").innerHTML = generation + " /second";
    }, 100);

    
    setInterval(() => {
        document.title = game.currency.toFixed() + " D20 Clicker";
    }, 3000);
});

