"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
var Genders;
(function (Genders) {
    Genders[Genders["male"] = 1] = "male";
    Genders[Genders["female"] = 2] = "female";
})(Genders || (Genders = {}));
class Character {
    constructor(distChara) {
        this.id = distChara.id;
        this.name = distChara.name;
        this.realName = distChara.real_name;
        this.birth = distChara.birth;
        this.publisher = distChara.publisher.name;
        this.gender = Genders[distChara.gender];
        this.isDead = distChara.issues_died_in.length > 0;
        this.numberOfDeath = distChara.issues_died_in.length;
        this.powers = distChara.powers.map(({ name }) => name);
        return this;
    }
}
exports.Character = Character;
//# sourceMappingURL=Character.js.map