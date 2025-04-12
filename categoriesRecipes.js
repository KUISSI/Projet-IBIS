// liste déroulante catégories

const selectElementCategorie = document.getElementById("categories");

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);  
    }  
      return response.json();
  })
  .catch((error) => {
    console.error("Il y a eu un problème avec la requête fetch :", error);
  }
  )
    .then((json) => {
      const detailedCategories = json.meals;
      console.log(detailedCategories);
      if (json.meals && json.meals.length > 0) {
        for (const detailedCategories of json.meals) {
          const optionElement = document.createElement("option");
          optionElement.innerHTML = detailedCategories.strCategory;
          selectElementCategorie.appendChild(optionElement);
        }
      } else {
        const optionElement = document.createElement("option");
        optionElement.textContent = "Aucune catégorie trouvée";
        selectElementCategorie.appendChild(optionElement);
      }
    });
});

// Écouteur pour détecter la sélection d'une catégorie + insértion dans la div
selectElementCategorie.addEventListener("change", () => {
  document.getElementById("recipes-by-countries").innerHTML = "";
  document.getElementById("recipes-by-ingredients").innerHTML = "";
  document.getElementById("recipes-by-click").innerHTML = "";
  fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
      selectElementCategorie.value
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);  
    }  
      return response.json();
  })
  .catch((error) => {
    console.error("Il y a eu un problème avec la requête fetch :", error);
    const messageErreur = document.getElementById("recipes-by-categories");
    messageErreur.innerText = "Oups ! Une erreur est survenue lors du chargement.";
  }
  )
    .then((json) => {
      const recettesCategories = document.getElementById(
        "recipes-by-categories"
      );
      recettesCategories.innerText = "";
      for (const meal of json.meals) {
        const cardCategory = createRecipeCard(meal);
        recettesCategories.appendChild(cardCategory);
      }
    });
});
