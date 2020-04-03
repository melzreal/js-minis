const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swapElement = document.getElementById('swap');

//get currency - gbp, hkd etc
function calculate() {
    const curOne = currencyOne.value;
    const curTwo = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${curOne}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[curTwo];
            rateElement.innerText = `1 ${curOne} = ${rate} ${curTwo}`;
            amountTwo.value = (amountOne.value * rate).toFixed(2);

        })

}
//a select list always has a change event that we can listen for
//input is another event we can listen to

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
swapElement.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();

})

calculate();