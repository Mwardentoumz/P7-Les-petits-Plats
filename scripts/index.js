class App {
    constructor() {
        this.RecipesApi = new RecipesApi('../assets/data/recipes.json')
        
    }
        async displayData() {
            const RecipesSection = document.querySelector("container_fluid recipes");
            console.log(RecipesSection)

            const RecipesData = await this.RecipesApi.getRecipes();
            console.log(RecipesData)
            
            const NewRecipe = RecipesData.map(data => new RecipeFactory(data))
            console.log(NewRecipe)
            

            // NewPhotographer.forEach(photographer => {
            //     const Template = new photographerCard(photographer)
            //     console.log(photographerCard)
            //     photographersSection.appendChild(Template.createPhotographerCard())
                
                    
            // })
        }      
    }


const app = new App()
app.displayData()

