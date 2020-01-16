# [D20 Clicker Live](https://wolf-fivousix.github.io/D20_Clicker/)

## Technologies:
* JavaScript
* HTML5
* CSS

![D20 Screen Shot](assets/D20_ScreenShot.png?raw=true "D20 Screen Shot")

## Table of Contents
Technologies
Instructions
Techical Implementation Details
Future Features

## Instructions:
As other idle games, gameplay is very straight forward: Click on the big dice and see those points rolling. Repeat until you can buy an upgrade.

## Technical Implementation Details
### 20 Sided Die
In order to make the die only using HTML and CSS the trick was using 0 sized elements with transparent borders. That gives us a triangle that can be translated and rotated in position to achieve the 3D effect.

```HTML
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


### Die animation layering
The animation itself was another big challenge. Not just to get the spin timing correct, but also to layer the multiple animations. I achieved that by inserting the spin animation and removing the idle class on the click event. More secretly though, the moment the idle animation returns is critical, and to achieve that seemless feeling I saved the timeOut to a local variable that get's erased anytime a new click occurs. Thus ensuring that the idle animation does not overlap with the spin animation.

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


## Future Features.
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
