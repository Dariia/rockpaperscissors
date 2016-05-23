/**
 * User
 * @constructor
 */
function User() {
}
User.prototype = {
    userScore: 0,
    userChoiceItem: null,
    userMadeChoice: false,
    userChoiceContainerId: '#game-user-',
    userScoreClass: '.game-user-score',
    userScoreIcon: '<span class="fa fa-star"></span>',

    /**
     * Init user
     */
    initUser: function () {
        this.scoreContainer = this.userChoiceContainer.find(this.userScoreClass);
        this.userReset();
        $(document).on('resetRound', function () {
            this.roundReset();
        }.bind(this));
    },

    /**
     * Reset user
     */
    roundReset: function () {
        this.userItemsReset(false);
        this.userMadeChoice = false;
    },

    /**
     * User reset
     */
    userReset: function () {
        this.userItemsReset(true);
        this.scoreContainer.html('');
    },

    /**
     * User add score
     */
    addScore: function () {
        this.userScore += 1;
        this.scoreContainer.append(this.userScoreIcon);
    },

    /**
     * Show users choice in browser
     */
    showChoice: function () {
        var choiceItem = this.userChoiceContainer.find('[data-choice="' + this.userChoiceItem + '"]');

        choiceItem.siblings().hide();
        choiceItem.show();
    },

    /**
     * User choice items reset
     */
    userItemsReset: function () {
        this.userChoiceContainer.find("[data-choice]").hide().off('click');
    }
};


/**
 * HumanUser
 * @constructor
 */

function HumanUser() {
}
HumanUser.prototype = Object.create(User.prototype);

/**
 * Human User init
 */
HumanUser.prototype.init = function () {
    this.userChoiceContainer = $(this.userChoiceContainerId + '1');
    this.initUser();
    this.userChoiceContainer.find("[data-choice]").on('click', function (e) {
        this.makeChoice(e);
    }.bind(this));
};

/**
 * User choice items reset
 * @param allReset {bool} is init reset
 */
HumanUser.prototype.userItemsReset = function (allReset) {
    var items = this.userChoiceContainer.find("[data-choice]");
    items.show();
    if (allReset) {
        items.off('click');
    }
};

/**
 * HumanUser choice
 * @param e {object} choice
 * @returns {bool} true - user made choice
 */
HumanUser.prototype.makeChoice = function (e) {
    var item = $(e.target);

    this.userChoiceItem = item.data('choice');
    this.showChoice();
    this.userMadeChoice = true;
    $(document).trigger('userMadeChoice');

    return this.userMadeChoice;
};


/**
 * ComputerUser
 * @constructor
 */
function ComputerUser() {
}
ComputerUser.prototype = Object.create(User.prototype);

/**
 * Computer User init
 * @param n {int} number of user
 * @param weaponArr {object} random choice
 */
ComputerUser.prototype.init = function (n, weaponArr) {
    this.weaponArr = weaponArr;
    this.userChoiceContainer = $(this.userChoiceContainerId + n);

    this.initUser();
    $(document).on('virtualStart userMadeChoice', function () {
        if (!this.userMadeChoice) {
            this.makeChoice();
        }
    }.bind(this));
};

/**
 * Computer choice
 * @returns {bool} user made choice
 */
ComputerUser.prototype.makeChoice = function () {
    this.userChoiceItem = this.getRandomChoice();
    this.userMadeChoice = true;
    this.showChoice();
    $(document).trigger('userMadeChoice');

    return this.userMadeChoice;
};

/**
 * Returnes random choise
 * @returns {int} random number
 */
ComputerUser.prototype.getRandom = function (max) {
    return Math.round(Math.random() * max);
};

/**
 * Returnes random choice
 * @returns {String} random choice name
 */
ComputerUser.prototype.getRandomChoice = function () {
    return this.weaponArr[this.getRandom(this.weaponArr.length - 1)].name;
};