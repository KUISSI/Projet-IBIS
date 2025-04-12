// liste déroulante pays
const selectElementPays = document.getElementById("countries");
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then((response) => response.json())
    .then((json) => {
      const detailedCountry = json.meals;
      console.log(detailedCountry);

      if (json.meals.length > 0) {
        for (const detailedCountry of json.meals) {
          const optionElement = document.createElement("option");
          optionElement.innerHTML = detailedCountry.strArea;
          optionElement.value = detailedCountry.strArea;
          selectElementPays.appendChild(optionElement);
        }
      } else {
        selectElementPays.innerText = "Aucun pays trouvé";
      }
    });
});

// Écouteur pour détecter la sélection d'une catégorie + insértion dans la div
selectElementPays.addEventListener("change", () => {
  document.getElementById("recipes-by-categories").innerHTML = "";
  document.getElementById("recipes-by-ingredients").innerHTML = "";
  document.getElementById("recipes-by-click").innerHTML = "";
  fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=" +
      selectElementPays.value
  )
    .then((response) => response.json())
    .then((json) => {
      const recettePays = document.getElementById("recipes-by-countries");

      recettePays.innerText = "";

      for (const meal of json.meals) {
        const cardPays = createRecipeCard(meal);
        recettePays.appendChild(cardPays);
      }
    });
});
