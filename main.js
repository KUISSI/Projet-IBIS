// écoute de input utilisateur
const searchIngredients = document.getElementById("ingredients");
searchIngredients.addEventListener("change", (event) => {
  const ingredients = event.target.value;
  console.log("Ingrédient tapé : " + ingredients);
  // Sélection de la liste des recettes sur le site
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredients)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const recettesIngredients = document.getElementById(
        "recipes-by-ingredients"
      );
      recettesIngredients.innerText = ""; //remettre à 0 l'affichage

      if (json.meals.length > 0) {
        for (const meal of json.meals) {
          const card = createRecipeCard(meal);
          recettesIngredients.appendChild(card);
        }
      } else {
        recettesIngredients.innerText = "Aucune recette trouvée";
      }
    });
});

/**
 *  la boucle sert à parcourir chaque objet recette que json retourne, normalement à chaque fois, 'meal' est différent.
donc, à chaque retour de 'meal' on lui créer une div différente avec le nom et l'image qu'on ajoute au HTML
    pour le côté esthétique, je créer des titres et j'insère les images aussi
    j'insère les img et title dans divElement et pas dans recettes pour avoir une structure propre
    la logique c'est : créer la div, l'ajouter à ma div html de base ensuite =>
        créer un titre et une img à entrer dans le div créee sur js*/
