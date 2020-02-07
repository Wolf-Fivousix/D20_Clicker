# [D20 Clicker Live](https://wolf-fivousix.github.io/D20_Clicker/)
![D20 Screen Shot](assets/d20Clicker.gif?raw=true "D20 Screen Shot")
D20 Clicker is a full JavaScript, HTML5 and CSS3 application. No extra libraries were used. As other idle games, gameplay is very straight forward: Click on the big die and see those points rolling. Repeat until you can buy an upgrade. Until infinity. If you can.

## Table of Contents
Technologies
Code Snipets
Future Features

## Technologies:
* JavaScript
* HTML5
* CSS3

## Code Snipets
### Game saving with inheritance
![Save Deletion Gif](assets/saveDeletion.gif?raw=true "Save Deletion Gif")
If a save file is found, the contents are transfered as arguments to the Game object using the spread operator. Otherwise, a default constructor is invoked setting the game state to initial.
```JavaScript
// /game_logic.js
const SAVE = loadGame();
const game = SAVE ? new Game(...SAVE) : new Game();

function loadGame() {
    let save = localStorage.getItem("d20Save");
    if (save) {
        save = save.split(",").map(x => parseInt(x));
        return save;
    }
    return null;
}
```
In order to maintain a DRY codebase, I encapsulated the shared logic between all components. Most behaviors are similar, with different variables governing their power/function. Specific differences are achieved by custom methods, like the Die increased click functionality.
```JavaScript
// /Game.js
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
        this.warrior = new PartyMember(warrior, 200, 1.05);
        this.arcanist = new PartyMember(arcanist, 1300, 1.15);
        this.dragon = new PartyMember(dragon, 6666, 1.5);
    }
};
```

### Die animation layering
![Die Animation Layering](assets/dieAnimation.gif?raw=true "Die Animation Layering")
The animation itself was another big challenge. Not just to get the spin timing correct, but also to layer the multiple animations. I achieved that by inserting the spin animation and removing the idle class on the click event. More secretly though, the moment the idle animation returns is critical, and to achieve that seemless feeling I saved the timeOut to a local variable that get's erased anytime a new click occurs. Thus ensuring that the idle animation does not overlap with the spin animation.
```JavaScript
// /game_logic.js

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
```

In order to make the die only using HTML and CSS the trick was to use 0 sized elements with transparent borders. That gives us a triangle that can be translated and rotated in position to achieve the 3D effect.
```HTML
<!-- /index.html -->
<figure class="icosahedronContainer">
    <div id="icosahedron"
    class="icosahedron spinIdle"
    onClick="D20Clicker()"
    >

        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
    
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
    
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
    
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
        <div class="d20Side"></div>
    </div>
    <div class="dieNumberDisplay">
        <div id="D20" class="dieNumberText"></div>
    </div>
</figure>
```
```CSS
.d20Side:nth-child(1) {
    transform: translateY(-18.5px) rotateY(72deg) rotateX(52.62deg);
}
.d20Side:nth-child(6) {
    transform: translateY(361.8px) rotateY(468deg) rotateX(127.38deg);
}
.d20Side:nth-child(11) {
    transform: translateY(86.6px) rotateY(828deg) translateZ(170.1px) rotateX(-10.81deg);
}
.d20Side:nth-child(20) {
    transform: translateY(256.7px) rotateY(1440deg) rotateZ(180deg) translateZ(170.1px) rotateX(-10.81deg);
}
```

## Future Features.
* Die background effect for drawing attention.
* Add Status/Attributes like total points, clicks, points generated passively, time played, etc.
* Screen Fill Effect.
* Add banner details on plate hover.
* Upgrades/Boosters, a.k.a. Store.
* Ascend Mechanic.
* Achievements.
* Add option to show die bonuses on click.
* Enable game to compensate tab out of focus.
