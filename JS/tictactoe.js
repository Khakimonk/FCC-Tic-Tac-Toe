$(document).ready(function() {
    alert("X or O");
});


var $tdSelect = $('td');


$tdSelect.click(function() {
    var board = $(this);
    checkBoard(board, player);
})

function checkBoard(board, player) {
    if(board.text() != "") {
        console.log("Square already selected");
    } else {
        board.text(player);
    }
}