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

function formatNumber(number) {
    let formated = [];
    number = String(number).split("").reverse();
    while (number.length > 0) {
        if(formated.length % 4 === 3) formated.unshift(".");
        formated.unshift(number.shift());
    }
    return formated.join("");
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
        const swordTick = game.sword.level / 10;
        const shieldTick = game.shield.level / 2;
        const fireBallTick = game.fireBall.level * 4;
        game.changeCurrency(swordTick);
        game.changeCurrency(shieldTick);
        game.changeCurrency(fireBallTick);
        const generation = (swordTick + shieldTick + fireBallTick) * 10;
        document.getElementById("currencyPerSecond").innerHTML = formatNumber(generation) + " / second";
    }, 100);

    
    setInterval(() => {
        document.title = game.currency.toFixed() + " D20 Clicker";
    }, 3000);
});

