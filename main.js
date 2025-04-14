const searchIngredients = document.getElementById("ingredients");

searchIngredients.addEventListener("change", (event) => {
  const ingredients = event.target.value;
  const containerId = "recipes-by-ingredients";
  const container = document.getElementById(containerId);
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredients;

  fetchData(url)
    .then((json) => {
      clearContainer(containerId);

      if (json.meals && json.meals.length > 0) {
        for (const meal of json.meals) {
          const card = createRecipeCard(meal);
          container.appendChild(card);
        }
        scrollToElement(containerId);
      } else {
        container.appendChild(createMessage("Aucune recette trouvée.", "error-message"));
      }
    })
    .catch((error) => {
      console.error("Il y a eu un problème avec la requête fetch :", error);
      clearContainer(containerId);
      container.appendChild(createMessage("Oups ! Une erreur est survenue lors du chargement.", "error-message"));
    });
});

/**
 *  la boucle sert à parcourir chaque objet recette que json retourne, normalement à chaque fois, 'meal' est différent.
donc, à chaque retour de 'meal' on lui créer une div différente avec le nom et l'image qu'on ajoute au HTML
    pour le côté esthétique, je créer des titres et j'insère les images aussi
    j'insère les img et title dans divElement et pas dans recettes pour avoir une structure propre
    la logique c'est : créer la div, l'ajouter à ma div html de base ensuite =>
        créer un titre et une img à entrer dans le div créee sur js*/
