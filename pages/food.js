let search = document.getElementById("search");
let found_or_not = document.querySelector(".found-or-not");
let results_container = document.querySelector(".results-container");
let details_container = document.querySelector(".detail-container");

let showDetails = (element) => {
    details_container.innerHTML = `
        <h1 class="heading">${element.strMeal}</h1>
        <img src="${element.strMealThumb}" alt="FoodImage"/>
        <div class="rc-container">
            <h3>${element.strCategory}</h3>
            <h3>${element.strArea}</h3>
        </div>
        <p>${element.strInstructions}</p>
        <h2>Ingredients</h2>
        <div></div>
    `;

    let ingredients_container = document.createElement("div"); 
    ingredients_container.classList.add("ingredients-container");

    for(let i=1; i<=20; i++){
        if(eval(`element.strIngredient${i}`)){
            let ingredient = document.createElement("span");
            ingredient.innerText = eval(`element.strIngredient${i}`) + '-' + eval(`element.strMeasure${i}`);
            ingredients_container.appendChild(ingredient);
        }
        details_container.appendChild(ingredients_container);
    }
}

//creating overview grids 
let createGrid = (meals) => {
    results_container.innerHTML = "";

     meals.forEach( meal => {
        let img_container = document.createElement("div");
        img_container.classList.add("img_container");

        img_container.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal_info">${meal.strMeal}</div>
        `;

        img_container.addEventListener('click', () => {
            showDetails(meal);
            scroll({
                top: details_container.offsetTop,
                left: 0,
                behavior: 'smooth'
            })
        })
        results_container.appendChild(img_container);
    });

}

//Result Header
let search_result = (check) => {
    found_or_not.innerHTML = (check) ? `Search results for '${input_value}':` : `There are no search results. Try again!`;
}

//fetch meals from API
let find = (e) => {
    if(e.keyCode === 13 && search.value.length != 0){
        input_value = search.value;
        search.value = '';
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input_value}`)
        .then( response => response.json() )
        .then( result => result.meals)
        .then( meals => {
            if(meals != null){
                search_result(true);
                createGrid(meals);
                console.log(meals);
            }
            else {
                search_result(false);
            }
        })
    }
}

search.addEventListener('keypress', find);


// response => response.json()

// function (response) {
//     return response.json();
// }

// function sum(a, b) {
//     return a+b;
// }

// let sum = (a, b) => {
//     return a + b;
// }

// let sum = (a, b) => a+b;