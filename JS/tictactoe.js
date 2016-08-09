var $tdSelect = $('td');
var $modal = $('#playerSelect');
var gameBoard = ["E", "E", "E",
                 "E", "E", "E",
                 "E", "E", "E"];

var nodeList = document.getElementsByTagName("td");

function displayNode() {
    for(var i = 0; i < nodeList.length; i++) {
        console.log(nodeList[i].innerHTML);
        if(nodeList[i].innerHTML !== "") {
            gameBoard[i] = nodeList[i].innerHTML;
        }
    }
    console.log(gameBoard);
}

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
    displayNode();
    getWinning();
});

function checkBoard(board, player) {
    if(board.text() !== "") {
        console.log("Square already selected");
    } 
    else {
        board.text(player);
    }
}

//	[0, 1, 2,
//	 3, 4, 5,
//	 6, 7, 8]
function getWinning() {
    for(var i = 0; i < 9; i+=3) {
        if(gameBoard[i] !== "E" && gameBoard[i] === gameBoard[i + 1] && gameBoard[i + 1] === gameBoard[i + 2]) {
            console.log("row check true");
            return true;
        }
    }
    for(var i = 0; i < 3; i++) {
        if(gameBoard[i] !== "E" && gameBoard[i] === gameBoard[i + 3] && gameBoard[i + 3] === gameBoard[i + 6]) {
            console.log("column check true");
            return true;
        }
    }
    if(gameBoard[0] !== "E" && gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) {
        console.log("diagonal check true");
        return true;
    } 
    else if(gameBoard[2] !== "E" && gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
        console.log("diagonal check true");
        return true;
    }
};