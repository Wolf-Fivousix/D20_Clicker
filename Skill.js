class Skill {
    constructor(level, cost, multiplier) {
        this.level = level;
        this.cost = cost;
        this.multiplier = multiplier;
    }
    levelUp() {
        ++this.level;
        this.cost = Math.ceil(this.cost * this.multiplier);
        return null;
    }
}