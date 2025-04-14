const selectElementPays = document.getElementById("countries");

document.addEventListener("DOMContentLoaded", () => {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

  fetchData(url)
    .then((json) => {
      if (json.meals && json.meals.length > 0) {
        for (const country of json.meals) {
          const option = document.createElement("option");
          option.textContent = country.strArea;
          option.value = country.strArea;
          selectElementPays.appendChild(option);
        }
      } else {
        const fallback = document.createElement("option");
        fallback.textContent = "Aucun pays trouvé";
        selectElementPays.appendChild(fallback);
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des pays :", error);
    });
});

// Lorsqu’un pays est sélectionné :
selectElementPays.addEventListener("change", () => {
  const containerId = "recipes-by-countries";
  const container = document.getElementById(containerId);
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + selectElementPays.value;

  // Réinitialisation des autres blocs
  clearContainer("recipes-by-categories");
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
