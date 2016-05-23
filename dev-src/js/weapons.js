/**
 * Weapons
 * @constructor
 */
function Weapons() {
}
/**
 * Weapons prototype
 */
Weapons.prototype = {
    /**
     * Weapons array
     */
    weaponArray: [
        {
            name: 'scissors',
            wins: ['paper', 'lizard']
        },
        {
            name: 'rock',
            wins: ['scissors', 'lizard']
        },
        {
            name: 'paper',
            wins: ['rock', 'spock']
        },
        {
            name: 'lizard',
            wins: ['paper', 'spock']
        },
        {
            name: 'spock',
            wins: ['scissors', 'rock']
        }

    ],

    /**
     *  Compares Weapon
     * @param {Object} item1 weapon opponent 1
     * @param {Object} item2 weapon opponent 2
     * @returns {String} 0 - draw, 1 - item1 wins, 2 - item2 wins
     */
    compareWeapon: function (item1, item2) {
        if (item1.toLowerCase() === item2.toLowerCase())
            return '';
        var choice1, choice2;
        for (var i = 0, r = this.weaponArray.length; i < r; i++) {
            if (this.weaponArray[i].name == item1.toLowerCase()) {
                choice1 = this.weaponArray[i];
            }
            if (this.weaponArray[i].name == item2.toLowerCase()) {
                choice2 = this.weaponArray[i];
            }
        }

        for (var j = 0, l = choice1.wins.length; j < l; j++) {
            if (choice1.wins[j].toLowerCase() == item2.toLowerCase()) {
                return item1;
            }
        }

        for (j = 0, l = choice2.wins.length; j < l; j++) {
            if (choice2.wins[j].toLowerCase() == item1.toLowerCase()) {
                return item2;
            }
        }
    }
};
