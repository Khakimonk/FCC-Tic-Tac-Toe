var $tdSelect = $('td');
var $modal = $('#playerSelect');

var nodeList = document.getElementsByTagName("td");

function displayNode() {
    for(var i = 0; i < nodeList.length; i++) {
        console.log(nodeList[i].innerHTML);
    }
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
});

function checkBoard(board, player) {
    if(board.text() != "") {
        console.log("Square already selected");
    } 
    else {
        board.text(player);
    }
}

function checkWinning(board, player) {
    for(var i = 0; i < nodeList.length; i++) {
        if(nodeList[i].innerHTML !== "" && nodeList[i].innerHTML === nodeList[i + 1].innerHTML && nodeList[i + 1].innerHTML === nodeList[i + 2].innerHTML) {
            return 1;
        }

        if(nodeList[i].innerHTML !== "" && nodeList[i].innerHTML === nodeList[i + 3].innerHTML && nodeList[i + 3].innerHTML === nodeList[i + 6].innerHTML) {
            return 1;
        }

        for(var j = 4; j < nodeList.length; j + 4) {
            if(nodeList[i].innerHTML !== "" && nodeList[i].innerHTML === nodeList[j].innerHTML && nodeList[j].innerHTML === nodeList[j + 4].innerHTML) {
                return 1;
            }
        }


    }
}