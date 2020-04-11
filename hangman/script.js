const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['potato', 'bonkers', 'manatee', 'chicken', 'peanut'];


// take a random item from your array 
let randomWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

const correctGuess = ['a'];
const wrongGuess = [];

// we split the strings into letters and turn the letters into an array to iterate over
//then turn it back into a string with join
function displayWord() {
    wordEl.innerHTML = `${randomWord.split('').map(letter =>
        `<span class="letter"> ${correctGuess.includes(letter) ? letter : ''} </span>`).join('')}`;


    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

    if (innerWord === randomWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';

        playable = false;
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongGuess.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongGuess.map(letter => `<span>${letter}</span>`)}
  `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongGuess.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongGuess.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        finalMessageRevealWord.innerText = `...the word was: ${randomWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if (playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toLowerCase();

            if (randomWord.includes(letter)) {
                if (!correctGuess.includes(letter)) {
                    correctGuess.push(letter);

                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongGuess.includes(letter)) {
                    wrongGuess.push(letter);

                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        }
    }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    playable = true;

    //  Empty arrays
    correctGuess.splice(0);
    wrongGuess.splice(0);

    randomWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();