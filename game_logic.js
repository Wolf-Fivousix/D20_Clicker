const SAVE = loadGame();
const game = SAVE ? new Game(...SAVE) : new Game();
let d20DisplayTimer = setTimeout(() => document.getElementById("D20").innerHTML = "00");

function D20Clicker() {
    let roll = Math.ceil(Math.random() * 20);  
    
    // Floating Numbers.
    const miniDie = document.createElement("p");
    const rollText = document.createTextNode("+" + (roll + game.die.level));
    miniDie.appendChild(rollText);
    miniDie.classList.add("floatingRoll");
    miniDie.style.top = event.clientY + "px";
    miniDie.style.left = event.clientX + "px";
    document.getElementById("root").appendChild(miniDie);
    setTimeout(() => document.getElementById("root").removeChild(miniDie), 1500);

    game.changeCurrency(roll + game.die.level);
    if (roll < 10) roll = "0" + roll;
    document.getElementById("D20").innerHTML = "";

    // Animation handling.
    const die = document.getElementById("icosahedron");
    die.classList.remove("spinIdle");
    die.animate(
        [
            { transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)" },
            { transform: "rotateX(710deg) rotateY(360deg) rotateZ(360deg)" }
        ],
        {
            duration: 2000,
            iterations: 1,
            easing: "ease-out"
        }
    );    
    clearTimeout(d20DisplayTimer);

    d20DisplayTimer = setTimeout(() => {
        document.getElementById("D20").innerHTML = roll;
        die.classList.add("spinIdle");
    }, 2000);
}

function levelUp(attribute) {
    if(game[attribute].cost <= game.currency) {
        game.changeCurrency(-game[attribute].cost);
        game[attribute].levelUp();
        document.getElementById(attribute + "Level").innerHTML = game[attribute].level;
        document.getElementById(attribute + "Cost").innerHTML = formatNumber(game[attribute].cost);
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
    document.getElementById("dieLevel").innerHTML = game.die.level;
    document.getElementById("dieCost").innerHTML = formatNumber(game.die.cost);
    document.getElementById("warriorLevel").innerHTML = game.warrior.level;
    document.getElementById("warriorCost").innerHTML = formatNumber(game.warrior.cost);
    document.getElementById("arcanistLevel").innerHTML = game.arcanist.level;
    document.getElementById("arcanistCost").innerHTML = formatNumber(game.arcanist.cost);
    document.getElementById("dragonLevel").innerHTML = game.dragon.level;
    document.getElementById("dragonCost").innerHTML = formatNumber(game.dragon.cost);
        
    setInterval(() => {
        const warriorTick = game.warrior.level / game.fps;
        const arcanistTick = game.arcanist.level * 10 / game.fps;
        const dragonTick = game.dragon.level * 100 / game.fps;
        game.changeCurrency(warriorTick);
        game.changeCurrency(arcanistTick);
        game.changeCurrency(dragonTick);
        const generation = Math.floor((warriorTick + arcanistTick + dragonTick) * game.fps);
        document.getElementById("currencyPerSecond").innerHTML = formatNumber(generation) + " / second";

        game.updateCostColors();
    }, game.fps);

    
    setInterval(() => {
        document.title = game.currency.toFixed() + " D20 Clicker";
    }, 3000);
});

