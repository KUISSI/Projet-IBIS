// fonction pour afficher les noms de recettes ainsi que leurs images
function createRecipeCard(meal) {
  const divElement = document.createElement("div"); //création d'une div pour chaque recette
  divElement.className = "recipe";

  const title = document.createElement("h2"); //création d'un titre pour chaque recette
  title.innerText = meal.strMeal;
  divElement.appendChild(title);

  const img = document.createElement("img"); //création d'une image pour chaque recette
  img.id = "imgReceipe";
  img.src = meal.strMealThumb;
  divElement.appendChild(img);

  img.addEventListener("click", () => {
    const id = meal.idMeal;
    const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;

    fetchData(url)
      .then((json) => {
        const detailedMeal = json.meals[0];
        displayDetailedMeal(detailedMeal);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du détail :", error);
      });
  });

  return divElement;
}

// Fonction pour récupérer les ingrédients d'un repas
function getIngredients(meal) {
  let ingredients = []; // Initialisation dun tableau vide pour stocker les ingrédients
  for (let i = 1; i < numIngredients; i++) {
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

// Fonction pour afficher les détails d'un repas
function displayDetailedMeal(detailedMeal) {
  clearContainer("recipes-by-countries");
  clearContainer("recipes-by-categories");
  console.log(detailedMeal);

  const recettesClick = document.getElementById("recipes-by-click");
  clearContainer("recipes-by-click");

  const detailCard = document.createElement("div");
  detailCard.className = "recipe-detail"; // ceci est créer pour le css, pour pouvoir stylisé les éléments détaillés lors du click

  const titleClick = document.createElement("h1");
  titleClick.innerText = detailedMeal.strMeal;
  detailCard.appendChild(titleClick);

  const areaClick = document.createElement("h2");
  areaClick.innerHTML = detailedMeal.strArea;
  detailCard.appendChild(areaClick);
  const area = detailedMeal.strArea;
  const countryName = areaToCountry[area] || area;
  // Utilise le nom du pays ou la région si non trouvé dans le tableau
  fetch("https://restcountries.com/v3.1/name/" + countryName)
    .then((response) => response.json())
    .then((data) => {
      if (data && data[0] && data[0].flags && data[0].flags.png) {
        const flagImg = document.createElement("img");
        flagImg.src = data[0].flags.png;
        flagImg.alt = "Drapeau de " + detailedMeal.strArea;
        flagImg.className = "flag"; // pour le style

        areaClick.appendChild(flagImg);
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du drapeau :", error);
    });

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
      previewImage.src =
        "https://www.themealdb.com/images/ingredients/" +
        ingredientName +
        ".png"; // URL de l'image de l'ingrédient
      previewImage.alt = ingredientName;
      previewImage.style.display = "block";
      // 👉 Nouvelle partie : positionner dynamiquement
      const rect = li.getBoundingClientRect();
      previewImage.style.position = "absolute";
      previewImage.style.top = rect.top + window.scrollY + "px";
      previewImage.style.left = rect.right + 10 + "px";
    });
    // On ajoute un écouteur d'événement pour masquer l'image de l'ingrédient au survol
    li.addEventListener("mouseleave", () => {
      previewImage.style.display = "none";
    });

    ingredientsList.appendChild(li);
  }

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.className = "ingredients-container";

  ingredientsContainer.appendChild(ingredientsList);
  ingredientsContainer.appendChild(previewImage);

  detailCard.appendChild(ingredientsContainer);

  const instructionsTitle = document.createElement("h3"); // ajoute un titre instructions
  instructionsTitle.innerText = "Instructions";
  detailCard.appendChild(instructionsTitle);

  const instructionsClick = document.createElement("p");
  instructionsClick.innerText = detailedMeal.strInstructions;
  detailCard.appendChild(instructionsClick);

  recettesClick.appendChild(detailCard);
  scrollToElement("recipes-by-click"); // Scroll vers la section des recettes cliquées
}
