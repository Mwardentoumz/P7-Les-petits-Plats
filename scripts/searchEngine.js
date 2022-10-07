import { RecipeCard } from './RecipeFactory.js'

class Search {
    constructor() {
        // retrieve the data
        this.RecipesApi = new RecipesApi('../assets/data/recipes.json')

    }
    async searchEngine(){
        const RecipesSection = document.getElementById("deck");
        let mainsearch = document.getElementById('mainsearch')
        console.log(mainsearch)
        var result = null
        let Recipes = null
        mainsearch.addEventListener('change', (e) =>{
            if (e.target.value.length >= 3){
                result = e.target.value
                console.log(result)
            }
            RecipesSection.innerHTML = ""
            

            
        })
        
    }
}