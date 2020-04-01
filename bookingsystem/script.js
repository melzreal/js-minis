const container = document.querySelector('.container');

//queryselector all treats the elements selected as an array
//so that way we can run array methods on them
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//adding a plus sign turns your value from a string into a number
let ticketPrice = +movieSelect.value;

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();

})

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;


}
//it is more performant to grab the container instead of the seats
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

