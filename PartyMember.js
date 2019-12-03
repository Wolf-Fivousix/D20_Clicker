class PartyMember {
    constructor(level, cost, multiplier) {
        this.level = 0;
        this.cost = cost;
        this.multiplier = multiplier;
        this.ajustCost(level);
    }

    levelUp() {
        ++this.level;
        this.cost = Math.ceil(this.cost * this.multiplier);
    }
}

PartyMember.prototype.ajustCost = function (level) {
    for(let i = 0; i < level; ++i) this.levelUp();
};