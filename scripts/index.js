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


        const AllIng = []
        const AllUstensils = []
        const AllAppliance = []

        NewRecipe.forEach(RecipeCard => {
            RecipeCard.$wrapperCard = document.createElement('div')

            const arr = RecipeCard.ingredients
            
            
            
            
            function makeUL(arr) {
                var list = document.createElement('ul')
                arr.forEach(ingredient => {

                    AllIng.push(ingredient.ingredient.toLowerCase())
                    
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
                    


                    

                })
                
                return list.innerHTML
            }




            var card = `
                                <div class="card center mb-5" style="width: 32rem; max-height: 600px">
                                    <img class="card-img-top" src="../assets/data/grey.jpg" alt="Card image cap">
                                    <div class="card-body">
                                        <div class="row header">
                                            <h2 class="card-title">${RecipeCard._name}</h2>
                                            <div class="time">
                                                <span class="material-symbols-outlined">schedule</span>
                                                <h1 class="card-subtitle">${RecipeCard._time}</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">${makeUL(arr)}</div>
                                            <div class="col-sm-6 text-wrap">${RecipeCard._description}</div>
                                        </div>
                                    </div>
                                </div>`            
            RecipeCard.$wrapperCard.innerHTML = card
            RecipesSection.appendChild(RecipeCard.$wrapperCard)





        })

        console.log(AllIng)
        // toutlesing.filter()
        let set = new Set(AllIng)
        console.log(set)

        
    }
    
}




const app = new App()
app.displayData()

