(function () {
    'use strict';
})();

/**
 *  Game
 * @constructor
 */
function Game() {
    this.startContainer = $('#game-start');
    this.gameContainer = $('#game-container');
    this.startContainerBtns = this.startContainer.find('.btn');
    this.resetBtn = $('#reset-game');
    this.resetRoundBtn = $('#next-round');
    this.errorContainer = $('#error');
    this.users = [];
    this.realUserClass = 'uc';
    this.resultContainer = $('#result');
    this.noWinnersMessage = 'Nobody wins!';
    this.errorMessage = 'Something went wrong!';
}

Game.prototype = {
    weapon: new Weapons(),
    /**
     *  Init the general game events
     */
    init: function () {
        this.startContainerBtns.on('click', function (e) {
            this.startGame(e);
        }.bind(this));
        this.resetBtn.on('click', function (e) {
            this.resetGame(e);
        }.bind(this));
        this.resetRoundBtn.on('click', function () {
            this.resetRound();
        }.bind(this));
        $(document).on('userMadeChoice', function () {
            this.choicesCompare();
        }.bind(this));
    },

    /**
     *  Game start
     *  @param {object} e
     */
    startGame: function (e) {
        this.realUser = (e.target.id == this.realUserClass);
        this.initUsers();
        this.startContainer.hide();
        this.gameContainer.show();
        if (!this.realUser) {
            $(document).trigger('virtualStart');
        }
    },

    /**
     * Users init
     */
    initUsers: function () {
        this.user1 = this.realUser ? new HumanUser() : new ComputerUser();
        if (this.realUser) {
            this.user1.init();
        } else {
            this.user1.init(1, this.weapon.weaponArray);
        }

        this.user2 = new ComputerUser();
        this.user2.init(2, this.weapon.weaponArray);

        this.users = [this.user1, this.user2];
    },

    /**
     *  Reset the game
     *
     */
    resetGame: function () {
        this.startContainer.show();
        this.gameContainer.hide();
        this.generalErrorHide();
        this.resultReset();
        this.deleteUsers();
    },

    /**
     * Delete user instances
     */
    deleteUsers: function () {
        $(document).off('resetRound');
        this.users = [];
    },

    /**
     * Reset round
     */
    resetRound: function () {
        $(document).trigger('resetRound');
        if (!this.realUser) {
            $(document).trigger('virtualStart');
        }
    },

    /**
     *  Choises compare
     * @returns {bool}
     */
    choicesCompare: function () {
        if (this.users[0].userMadeChoice && this.users[1].userMadeChoice) {
            var winner = this.weapon.compareWeapon(this.users[0].userChoiceItem, this.users[1].userChoiceItem);

            this.addScore(winner);
            this.showResult(winner);
        }
        return false;
    },

    /**
     * Show result message
     * @param msg {String} message
     */
    showResult: function (msg) {
        var message = this.errorMessage;

        if (msg !== 'error' && msg !== '') {
            message = msg + ' wins!';
        } else if (msg === '') {
            message = this.noWinnersMessage;
        }
        this.resultAdd(message);
    },

    /**
     * Show result message
     * @param winner {String} message
     */
    addScore: function (winner) {
        if (winner !== 'error' && winner !== '') {
            if (this.users[0].userChoiceItem == winner) {
                this.users[0].addScore();
            }
            else {
                this.users[1].addScore();
            }
        }
    },
    /**
     * Error shows
     * @param {String} str
     */
    generalErrorShow: function (str) {
        this.errorContainer.text(str).show();
    },

    /**
     * Error hides
     */
    generalErrorHide: function () {
        this.errorContainer.hide();
    },

    /**
     * Result container reset
     */
    resultReset: function () {
        this.resultContainer.html('').attr('aria-label', '');
    },

    /**
     * Result add
     * @param msg {String} message
     */
    resultAdd: function (msg) {
        this.resultContainer.html(msg).attr('aria-label', msg);
    }
};
