const container = document.querySelector('.container');

//queryselector all treats the elements selected as an array
//so that way we can run array methods on them
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const ticketPrice = movieSelect.value;

console.log(ticketPrice);