// liste déroulante catégories

const selectElementCategorie = document.getElementById("categories");
selectElementCategorie.addEventListener("click", () => {

fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
.then((response) => response.json())
    .then((json) => {

    const detailedCategories = json.meals;
    console.log(detailedCategories);
        if (json.meals.length > 0) {
            for(const detailedCategories of json.meals){       
                const optionElement = document.createElement("option");
                optionElement.innerHTML = detailedCategories.strCategory;
                selectElementCategorie.appendChild(optionElement);
            }
        } else {
            selectElementCategorie.innerText = "Aucune catégorie trouvée";
        }
});

});

// Écouteur pour détecter la sélection d'une catégorie + insértion dans la div
selectElementCategorie.addEventListener("change", () => {
        fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectElementCategorie.value)
            .then((response) => response.json())
            .then((json) => {
                const recettesCategories = document.getElementById("recipes-by-categories");
                recettesCategories.innerText = "";
                for (const meal of json.meals) {
                    const cardCategory = createRecipeCard(meal);
                    recettesCategories.appendChild(cardCategory);
                }
            })
            
    });