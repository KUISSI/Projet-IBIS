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
        document.getElementById("recipes-by-countries").innerHTML = "";
        document.getElementById("recipes-by-categories").innerHTML = "";
        console.log(detailedMeal);

        const recettesClick = document.getElementById("recipes-by-click");
        recettesClick.innerText = "";

        const detailCard = document.createElement("div");
        detailCard.className = "recipe-detail"; // ceci est créer pour le css, pour pouvoir stylisé les éléments détaillés lors du click

        const titleClick = document.createElement("h1");
        titleClick.innerText = detailedMeal.strMeal;
        detailCard.appendChild(titleClick);

        const areaClick = document.createElement("h2");
        areaClick.innerHTML = detailedMeal.strArea;
        detailCard.appendChild(areaClick);

        const imgClick = document.createElement("img");
        imgClick.id = "imgReceipe";
        imgClick.src = detailedMeal.strMealThumb;
        detailCard.appendChild(imgClick);

        const ingredientsTitle = document.createElement("h3"); // ajoute un titre ingrédients
        ingredientsTitle.innerText = "Ingrédients";
        detailCard.appendChild(ingredientsTitle);
        
        // créer une image pour l'aperçu de l'ingrédient
        const previewImage = document.createElement("img");
        previewImage.id = "ingredient-preview";
        previewImage.style.display = "none";
        previewImage.style.maxWidth = "150px";
        previewImage.style.marginTop = "20px";

        // créer une liste d'ingrédients
        const ingredientsList = document.createElement("ul");
        ingredientsList.className = "ingredients-list";

        // On récupère les ingrédients
        const ingredients = getIngredients(detailedMeal);

        // Pour chaque ingrédient, on ajoute un <li>
        for (const item of ingredients) {
          const li = document.createElement("li");
          li.innerText = item;
          // On ajoute un écouteur d'événement pour afficher l'image de l'ingrédient au survol
          li.addEventListener("mouseenter", () => {
            const ingredientName = item.split(" - ")[0]; // On récupère le nom de l'ingrédient
            previewImage.src = "https://www.themealdb.com/images/ingredients/" + ingredientName + ".png"; // URL de l'image de l'ingrédient
            previewImage.alt = ingredientName;
            previewImage.style.display = "block";
          });
          // On ajoute un écouteur d'événement pour masquer l'image de l'ingrédient au survol
          li.addEventListener("mouseleave", () => {
            previewImage.style.display = "none";
          });
          
          ingredientsList.appendChild(li);
        }

        detailCard.appendChild(previewImage);

        detailCard.appendChild(ingredientsList); // Ajoute la liste d'ingrédients à la carte de détails

        const instructionsTitle = document.createElement("h3"); // ajoute un titre instructions
        instructionsTitle.innerText = "Instructions";
        detailCard.appendChild(instructionsTitle);

        const instructionsClick = document.createElement("p");
        instructionsClick.innerText = detailedMeal.strInstructions;
        detailCard.appendChild(instructionsClick);

        recettesClick.appendChild(detailCard);
      });
  });

  return divElement;
}

function getIngredients(meal) {
  let ingredients = []; // Initialisation dun tableau vide pour stocker les ingrédients
  for (let i = 1; i <= 20; i++) {
    // L'API retourne jusqu'à 20 ingrédients
    const ingredient = meal[`strIngredient${i}`]; // Accès dynamique à strIngredient1, strIngredient2, ...
    const measure = meal[`strMeasure${i}`]; // Accès dynamique à strMeasure1, strMeasure2, ...
    if (ingredient && ingredient.trim() !== "") {
      // Vérifie si l'ingrédient est défini et non vide
      ingredients.push(`${ingredient} - ${measure}`); // Ajoute l'ingrédient et sa mesure au tableau
    }
  }

  return ingredients; // Retourne la liste des ingrédients
}
