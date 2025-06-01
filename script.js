const recipeForm = document.querySelector('.recipe-form');
const recipeCollection = document.querySelector('.recipe-collection');
let recipes = [];


function initRecipes() {
    const json = localStorage.getItem('recipes')
    if (!json) return []
    try {
        return JSON.parse(json)
    } catch (e) {
        console.log('Could not parse the json', e)
        return []
    }
    renderRecipes
}

/** add a new recipe object and save it in localStorage + render of the new items
 * @param {{ title: string, ingredients: string, steps: string, recipeImage: string }} recipeObj
 */

function addRecipe(recipeObj) {
    recipes.push(recipeObj);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    renderRecipes();
}


recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(recipeForm);
    const title = formData.get("title").trim();
    const ingredients = formData.get('ingredients').trim();
    const steps = formData.get('steps').trim();
    const recipeImage = formData.get('recipeImage').trim();

    if (!title || !ingredients || !steps || !recipeImage) {
        alert('Fill out all fields');
        return;
    }
    
    addRecipe({ title, ingredients, steps, recipeImage })
    recipeForm.reset();
});


function renderRecipes() {
    recipeCollection.innerHTML = recipes.map( (r, i) => `
    <div class="recipe-card">
    <h3>${r.title}</h3>
    <p><strong>Ingredientes:</strong> ${r.ingredients}</p>
    <p><strong>Steps:</strong> ${r.steps}</p>
    <img src="${r.recipeImage}" class="recipe-image">
    
    <div>
    <button type="button" class="delete" data-index="${i}">❌</button>
    </div></div>
`).join('');
    deleteRecipe();
}


function deleteRecipe() {
    document.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const confirmed = confirm("Do you really want to delete this recipe?")
            if (!confirmed) {
                return;
            }
            const idx = Number(btn.dataset.index);
            recipes.splice(idx, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            renderRecipes();
        })
    })

}

window.addEventListener('DOMContentLoaded', () => {
    recipes = initRecipes();
    renderRecipes();
  });