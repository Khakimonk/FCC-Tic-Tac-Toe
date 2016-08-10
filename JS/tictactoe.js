var $tdSelect = $('td');
var $modal = $('#playerSelect');

var gameBoard = document.getElementsByTagName('td');

$(document).ready(function () {
    $modal.css('display', 'block');
    console.log(gameBoard.length);
});

$('#exes').click(function() {
    playerIcon = 'X';
    computerIcon = 'O';
    $modal.css('display', 'none');
});

$('#oohs').click(function() {
    playerIcon = 'O';
    computerIcon = 'X';
    $modal.css('display', 'none');
});