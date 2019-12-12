# [D20 Clicker Live](https://d20-clicker.herokuapp.com/)

## Technologies:
* JavaScript
* HTML5
* CSS

## Table of Contents

## Instructions:
As other idle games, gameplay is very straight forward: Click on the big dice and see those points rolling. Repeat until you can buy an upgrade.

## Technical implementation details with code snippets (make sure it looks good).
1) Saving/Loading the game through Storage.
2) Die and spinning effect.
- In order to make the die only using HTML and CSS the trick was using 0 sized elements with transparent borders. That gives us a triangle that can be translated and rotated in position to achieve the 3D effect.
- The animation itself was another big challenge. Not just to get the spin timing correct, but also to layer the multiple animations. I achieved that by inserting the spin animation and removing the idle class on the click event. More secretly though, the moment the idle animation returns is critical, and to achieve that seemless feeling I saved the timeOut to a local variable that get's erased anytime a new click occurs. Thus ensuring that the idle animation does not overlap with the spin animation.

```JavaScript
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


3) Manipulating the DOM for temporary elements that die after a set time.

## To-dos/future features.
* Add icons and links to profiles.
* Die background effect for drawing attention.
* Add Status/Attributes like total points, clicks, points generated passively, time played, etc.
* Screen Fill Effect.
* Add banner details on plate hover.
* Upgrades/Boosters, a.k.a. Store.
* Ascend Mechanic.
* Achievements.
* Add option to show die bonuses on click.
* Enable game to compensate tab out of focus.
