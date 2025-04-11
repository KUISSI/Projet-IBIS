
// écoute de input utilisateur
const searchIngredients = document.getElementById('ingredients');
searchIngredients.addEventListener('change', (event) => {
    const ingredients = event.target.value;
    console.log('Ingrédient tapé : ' + ingredients)
    // Sélection de la liste des recettes sur le site
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + ingredients)
        .then((response) => {
            return response.json();
        }).then((json) => {

            const recettesIngredients = document.getElementById('recipes-by-ingredients');
            recettesIngredients.innerHTML = ''; //remettre à 0 l'affichage

            if(json.meals) //ce que me retourne le fetch avec le nom du tableau
             {
                 for (const meal of json.meals) {

                     const divElement = document.createElement('div');
                     divElement.className = 'recipe';
                     recettesIngredients.appendChild(divElement);
                     
                     const title = document.createElement('h2');
                     title.innerText = meal.strMeal;
                     divElement.appendChild(title);
                     
                     const img = document.createElement('img');
                     img.src = meal.strMealThumb;
                     divElement.appendChild(img);
                     
                    }
                    
                } else {
                recettesIngredients.innerText = "Aucune recette trouvée"
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

/**
 * pour le clique, il faudra faire une extraction de ce qu'il y a dans notre div recipesbyingredients, faire un addEventListener
 * au click et ensuite assigné un fetch de l'url avec l'id pour avoir toutes les infos
 */
    