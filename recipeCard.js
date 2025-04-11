function createRecipeCard(meal) {
    const divElement = document.createElement("div");
    divElement.className = "recipe";
    
    
    const title = document.createElement("h2");
    title.innerText = meal.strMeal;
    divElement.appendChild(title);
    
    const img = document.createElement("img");
    img.id = "imgReceipe";
    img.src = meal.strMealThumb;
    divElement.appendChild(img);
    
    img.addEventListener("click", () => {
      const id = meal.idMeal;
      console.log(id);
      fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((response) => {
          return response.json();
        })
        .then((json) => {
            const detailedMeal = json.meals[0];
            console.log(detailedMeal);
            
            const recettesClick =
            document.getElementById("recipes-by-click");
            recettesClick.innerText = "";
    
          const titleClick = document.createElement("h1");
          titleClick.innerText = detailedMeal.strMeal;
          recettesClick.appendChild(titleClick);
          
          const areaClick = document.createElement("h2");
          areaClick.innerHTML = detailedMeal.strArea;
          recettesClick.appendChild(areaClick);
          
          const imgClick = document.createElement("img");
          imgClick.id = "imgReceipe";
          imgClick.src = detailedMeal.strMealThumb;
          recettesClick.appendChild(imgClick);
          
          const ingredientsClick = document.createElement("li");
          const ingredients = getIngredients(detailedMeal);
          ingredientsClick.innerHTML = ingredients;
          recettesClick.appendChild(ingredientsClick);
          
          const instructionsClick = document.createElement("p");
          instructionsClick.innerText = detailedMeal.strInstructions;
          recettesClick.appendChild(instructionsClick);

        });
    });
  
    return divElement;

  }

    function getIngredients(meal) {
            let ingredients = ''; // Initialisation d'une chaîne vide pour stocker les ingrédients
            for (let i = 1; i <= 20; i++) { // L'API retourne jusqu'à 20 ingrédients
                const ingredient = meal[`strIngredient${i}`]; // Accès dynamique à strIngredient1, strIngredient2, ...
                const measure = meal[`strMeasure${i}`]; // Accès dynamique à strMeasure1, strMeasure2, ...
                if (ingredient && ingredient.trim() !== '') { // Vérifie si l'ingrédient est défini et non vide
                    ingredients += `${ingredient} - ${measure}\n`; // Ajoute l'ingrédient et sa mesure à la chaîne
                }
            }
            
            return ingredients.trim(); // Retourne la liste des ingrédients sans espaces inutiles
        }