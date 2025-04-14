const selectElementCategorie = document.getElementById("categories");

// Charger les catégories au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

  fetchData(url)
    .then((json) => {
      if (json.meals && json.meals.length > 0) {
        for (const category of json.meals) {
          const option = document.createElement("option");
          option.textContent = category.strCategory;
          selectElementCategorie.appendChild(option);
        }
      } else {
        const fallback = document.createElement("option");
        fallback.textContent = "Aucune catégorie trouvée";
        selectElementCategorie.appendChild(fallback);
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des catégories :", error);
    });
});

// Lorsqu'une catégorie est sélectionnée
selectElementCategorie.addEventListener("change", () => {
  const containerId = "recipes-by-categories";
  const container = document.getElementById(containerId);
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectElementCategorie.value;

  // Réinitialiser les autres blocs
  clearContainer("recipes-by-countries");
  clearContainer("recipes-by-ingredients");
  clearContainer("recipes-by-click");

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
      console.error("Erreur lors du chargement des recettes :", error);
      clearContainer(containerId);
      container.appendChild(createMessage("Oups ! Une erreur est survenue lors du chargement.", "error-message"));
    });
});

