import { RecipeCard } from './RecipeFactory.js'

class App {
    constructor() {
        // retrieve the data
        this.RecipesApi = new RecipesApi('../assets/data/recipes.json')

    }
    async displayData() {
        // retrieve the deck section to insert recipes cards
        const RecipesSection = document.getElementById("deck");
        // store promess of fetch request
        const RecipesData = await this.RecipesApi.getRecipes();
        // map the card object with fetch data
        const NewRecipe = RecipesData.map(data => new RecipeCard(data))
        

        // initiate empty arrays for later filters data
        const AllIng = []
        const AllUstensils = []
        const AllAppliance = []

        // loop through our new objects to create cards
        NewRecipe.forEach(RecipeCard => {
            RecipeCard.$wrapperCard = document.createElement('div')
            const arr = RecipeCard.ingredients
            // separate appliances into unique elements
            let Appslice = RecipeCard._appliance.split(',')
            // push elements into arrays for filters
            AllUstensils.push(RecipeCard._ustensils)
            AllAppliance.push(Appslice[0])

            // this function generates a list for ingredients inside the recipe card
            function makeUL(arr) {
                let list = document.createElement('ul')
                arr.forEach(ingredient => {
                    AllIng.push(ingredient.ingredient.toLowerCase())
                    // on vérifie si la proprieté contient l'élement contient la proprieté unité & quantité - c'est l'équivalent de if/else
                    let unit = ingredient?.unit ? ingredient.unit : ""
                    let quantity = ingredient?.quantity ? ingredient.quantity : ""
                    // puis on renvoie la liste d'ingrédients dans le DOM
                    let li = document.createElement('li')
                    li.innerHTML = ingredient.ingredient + " : " + quantity + " " + unit
                    list.appendChild(li)
                })

                return list.innerHTML
            }
            // this is the HTML for the cards
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

        console.log(AllUstensils)
        // return a list of elements under the dropdown button for ingredients
        let IngDropdown = document.getElementById('ingrédients')
        let IngUL = document.createElement('ul')
        IngDropdown.appendChild(IngUL)
        let set1 = new Set(AllIng)
        
        set1.forEach(element => {
            let IngLi = document.createElement('a')
            IngLi.setAttribute('href', '#')
            IngLi.classList = 'dropdown-item'
            IngLi.innerHTML = " " + element
            IngUL.appendChild(IngLi)
            
        })
        // return a list of elements under the dropdown button for ustensils
        let UstDropdown = document.getElementById('Ustensiles')
        let UstUl = document.createElement('ul')
        UstDropdown.appendChild(UstUl)
        let set2 = new Set(AllUstensils)  
        console.log(set2)
        set2.forEach(element => {

            let UstLi = document.createElement('a')
            UstLi.setAttribute('href', '#')
            UstLi.classList = 'dropdown-item'
            UstLi.innerHTML = " " + element
            UstUl.appendChild(UstLi)
        })

        // return a list of elements under the dropdown button for appliances
        let AppDropdown = document.getElementById('Appliances')
        let AppUl = document.createElement('ul')
        AppDropdown.appendChild(AppUl)
        let set3 = new Set(AllAppliance)
        console.log(set3)
        set3.forEach(element => {
            
            let AppLi = document.createElement('a')
            AppLi.setAttribute('href', '#')
            AppLi.classList = 'dropdown-item'
            AppLi.innerHTML = " " + element
            AppUl.appendChild(AppLi)
        })

        // toggle event for the filters buttons
        
        document.addEventListener('click', (e) => {

            
            var list = e.target.closest('button')
            if(list.nextElementSibling.classList.contains('show')){
                list.nextElementSibling.classList.remove('show')
                list.nextElementSibling.style.display= 'none'
            }else{
                list.nextElementSibling.classList.add('show')
                list.nextElementSibling.style.display = 'inline-block'
            }
            
        })


       
    }






}






const app = new App()
app.displayData()

