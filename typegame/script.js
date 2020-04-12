const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
//get the focus to go into the text box
text.focus();
let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set the difficulty value on the UI
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

const words = [
  'sigh','eloquent','tense','pinball', 'steer',
  'peanut', 'coriander', 'airplane', 'mash', 'foreign',
  'forensic', 'pies', 'juice', 'warlike', 'north', 'dependent',
  'silver','highfalutin','superficial', 'quince','eight',
  'winner','gorgeous','super', 'flute','cordial' 
];

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord(){
  return words[Math.floor(Math.random() * words.length)]
}


function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = `${randomWord}`     
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}


function incrementTimer(){
    
    if(difficulty ==='hard'){
        time += 2;
    } else if (difficulty ==='medium'){
        time += 3;
    } else {
        time += 5;
    }
  
    timeEl.innerHTML = time + 's';

}

//we toggle the endgame div to show upon gameOver

function gameOver(){
    endgameEl.innerHTML = `  
    <h1>Time ran out</h1>
    <p>Time ran out</p>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;

    endgameEl.style.display = 'flex';
}




text.addEventListener('input', e =>{
    const textInserted = e.target.value;

    if(textInserted === randomWord){
        addWordToDOM();
        incrementTimer();
        updateScore();
        e.target.value = '';
    }

});

settingsBtn.addEventListener('click', () =>{
    
     settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', e => {
   difficulty = e.target.value;
   localStorage.setItem('difficulty', difficulty);
});

addWordToDOM();