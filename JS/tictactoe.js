var $tdSelect = $('td');
var $modal = $('#playerSelect');

$(document).ready(function () {
    $modal.css('display', 'block');
});

var playerIcon;

$('#exes').click(function() {
    playerIcon = 'X';
    $modal.css('display', 'none');
});

$('#oohs').click(function() {
    playerIcon = 'O';
    $modal.css('display', 'none');
});

$tdSelect.click(function() {
    var board = $(this);
    checkBoard(board, playerIcon);
});

function checkBoard(board, player) {
    if(board.text() != "") {
        console.log("Square already selected");
    } 
    else {
        board.text(player);
    }
}

var State = function(old) {
    this.turn = "";
    this.oMovesCount = 0;
    this.result = "still running";
    this.board = [];

    if(typeof old !== "undefined") {
        var len = old.board.length;
        this.board = new Array(len);
        for(var itr = 0; itr < len; itr++) {
            this.board[itr] = old.board[itr];
        }

        this.oMovesCount = old.oMovesCount;
        this.result = old.result;
        this.turn = old.turn;
    }
    
    this.advanceTurn = function() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    this.emptyCells = function() {
        var indxs = [];
        for(var itr = 0; itr < 9; itr++) {
            if(this.board[itr] === "E") {
                indxs.push(itr);
            }
        }
            return indxs;
    }

    this.isTerminal = function() {
        var B = this.board;

        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        for(var i = 0; i <= 2; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        for(var i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i +j] === B[i + 2*j]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        var available = this.emptyCells();
        if(available.length == 0) {
            this.result = "draw";
            return true;
        } 
        else {
            return false;
        }      
    };   
};

var AI = function(level) {
    var levelOfIntelligence = level;

    var game = {};

    function minimaxValue(state) {}

    function takeABlindMove(turn) {}

    function takeANoviceMove(turn) {}

    function takeAMasterMove(turn) {}

    this.plays = function(_game) {
        game = _game;
    };

    this.notify = function(turn) {
        switch(levelOfIntelligence) {
            case "blind":
            takeABlindMove(turn);
            break;
            case "novice":
            takeANoviceMove(turn);
            break;
            case "master":
            takeAMasterMove(turn);
            break;
        }
    };
};

var AIAction = function(pos) {

    this.movePosition  = pos;

    this.minimaxVal = 0;

    this.applyTo = function(state) {
        var next = new State(state);

        next.board[this.movePosition] = state.turn;

        if(state.turn === "O")
            next.oMovesCount++;

        next.advanceTurn();

        return next;
    }
};

AIAction.ASCENDING = function(firstAction, secondAction) {
if(firstAction.minimaxVal < secondAction.minimaxVal)
    return -1;
else if(firstAction.minimaxVal > secondAction.minimaxVal)
    return 1;
else
    return 0;
}

AIAction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1;
    else if (firstAction.minimaxVal < secondAction.minimaxVal)
        return 1;
    else
        return 0;
}

var Game = function(autoPlayer) {
    this.ai = autoPlayer;

    this.currentState = new State();

    this.currentState.board = ["E", "E", "E",
                                "E", "E", "E",
                                "E", "E", "E"];

    this.currentState.turn = "X";

    this.status = "beginning";

    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(_state.isTerminal()) {
            this.status = "ended";

            if(_state.result === "X-won")
                ui.switchViewTo("won");
            else if(_state.result === "O-won")
                ui.switchViewTo("lost");
            else
                ui.switchViewTo("draw");
        } 
        else {
            if(this.currentState.turn === "X") {
                ui.switchViewTo("human");
            } 
            else {
                ui.switchViewTo("robot");
                this.ai.notify("O");
            }
        }
    };

    this.start = function() {
        if(this.status = "beginning") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }
};

Game.score = function(_state) {
    if(_state.result !== "still running") {
        if(_state.result === "X-won") {
            return 10 - _state.oMovesCount;
        }
        else if(_state.result === "O-won") {
            return -10 + _state.oMovesCount;
        } 
        else {
            return 0;
        }
    }
};

function minimaxValue(state) {
    if(state.isTerminal()) {
        return game.score(state);
    }
    else {
        var stateScore;

        if(state.turn === "X")
            stateScore = -1000;
        else
            stateScore = 1000;

        var availablePositions = state.emptyCells();

        var availableNextStates = availablePositions.map(function(pos) {
            var action = AIAction(pos);

            var nextState = action.applyTo(state);

            return nextState;
        });

        availableNextStates.forEach( function(nextState) {
            var nextScore = minimaxValue(nextState);

            if(state.turn === "X") {
                if(nextScore > stateScore)
                    stateScore = nextScore;
            }
            else {
                if(nextScore < stateScore)
                    stateScore = nextScore;
            }
        });

        return stateScore;
    }
}

function takeAMasterMove(turn) {
    var available = game.currentState.emptyCells();

    var availableActions = available.map(function(pos) {
        var action = new AIAction(pos);

        var next = action.applyTo(game.currentState);

        action.minimaxVal = minimaxValue(next);

        return action;
    });

    if(turn === "X")
        availableActions.sort(AIAction.DESCENDING);
    else
        availableActions.sort(AIAction.ASCENDING);

    var chosenAction = availableActions[0];
    var next = chosenAction.applyTo(game.currentState);

    ui.insertAt(chosenAction.movePosition, turn);

    game.advanceTo(next);
}

