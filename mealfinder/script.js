const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');


function searchMeal(e){
    e.preventDefault();
    single_mealEl.innerHTML = '';
    const term = search.value;
    if(term.trim()){

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(data => data.json()) 
            .then(res => {
                if(res.meals === null ){
                    mealsEl.innerHTML = '';
                    resultHeading.innerHTML = `<h2>No search results available for '${term}' </h2>`
                } else {
                resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`                
                mealsEl.innerHTML = res.meals.map( meal => `
                    <div class="meal">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                      <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                      </div>
                    </div>`).join('');

                search.value = '';

                }
            })
    } else {
        alert('Please enter a search term');
    }

}

function randomMeal(){
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php
    `)
    .then(data => data.json())
    .then(res => {
        const meal = res.meals[0];           
        addMealToDOM(meal);

    })
}

function getMealByID(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then( data => data.json())
        .then( res => {
            const meal = res.meals[0];           
            addMealToDOM(meal);
        })
}

//ingredients are contained in strIngredients and are up to 20 ingredients
function addMealToDOM(meal) {
    const ingredients = [];
  
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }

    single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}



submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    });
    
    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealByID(mealID);
    }
})