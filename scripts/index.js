import { RecipeCard } from './RecipeFactory.js'

class App {
    constructor() {
        this.RecipesApi = new RecipesApi('../assets/data/recipes.json')

    }
    async displayData() {
        const RecipesSection = document.getElementById("deck");
        console.log(RecipesSection)

        const RecipesData = await this.RecipesApi.getRecipes();
        console.log(RecipesData)

        const NewRecipe = RecipesData.map(data => new RecipeCard(data))
        console.log(NewRecipe)




        NewRecipe.forEach(RecipeCard => {
            RecipeCard.$wrapperCard = document.createElement('div')

            const arr = RecipeCard.ingredients
            
            
            function makeUL(arr) {
                var list = document.createElement('ul')
                arr.forEach(ingredient => {
                    // console.log(ingredient.ingredient, ingredient.quantity, ingredient.unit)
                    var unt = ingredient.hasOwnProperty('unit')
                    if(unt){
                        var unit = ingredient.unit
                    }else{
                        var unit = ""
                    }
                    // console.log(unit)
                    var qtt = ingredient.hasOwnProperty('quantity')
                    if(qtt){
                        var quantity = ingredient.quantity
                    }else{
                        var quantity = ""
                    }
                    // console.log(quantity)
                    
                    var li = document.createElement('li')
                    li.innerHTML = ingredient.ingredient + " : " + quantity + " " + unit
                    list.appendChild(li)
                    console.log(list)


                    

                })
                return list.innerHTML
            }




            var card = `
                                <div class="card center" style="width: 30rem;">
                                    <img class="card-img-top" src="../assets/data/grey.jpg" alt="Card image cap">
                                    <div class="card-body">
                                        <aside>
                                            <h2 class="card-title">${RecipeCard._name}</h2>
                                            <div id="list-container" class="list-container">${makeUL(arr)}</div>
                                        </aside>
                                        <aside>
                                            <h2 class="card-title">${RecipeCard._time}</h2>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </aside>
                                    
                                    </div>
                                </div>`
            RecipeCard.$wrapperCard.innerHTML = card
            RecipesSection.appendChild(RecipeCard.$wrapperCard)





        })
    }
}




const app = new App()
app.displayData()

