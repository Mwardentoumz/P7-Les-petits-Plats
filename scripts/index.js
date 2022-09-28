import { RecipeCard } from './RecipeFactory.js'

class App {
    constructor() {
        this.RecipesApi = new RecipesApi('../assets/data/recipes.json')

    }
    async displayData() {
        const RecipesSection = document.getElementById("deck");
        // console.log(RecipesSection)

        const RecipesData = await this.RecipesApi.getRecipes();
        // console.log(RecipesData)

        const NewRecipe = RecipesData.map(data => new RecipeCard(data))
        // console.log(NewRecipe)


        const AllIng = []
        const AllUstensils = []
        const AllAppliance = []

        NewRecipe.forEach(RecipeCard => {
            RecipeCard.$wrapperCard = document.createElement('div')

            const arr = RecipeCard.ingredients




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



            // let set = new Set(AllIng)
            // console.log(set)
        })

        // return a list of elements under the dropdown button for ingredients
        let IngDropdown = document.getElementById('ingrédients')
        let IngUL = document.createElement('ul')
        IngDropdown.appendChild(IngUL)
        console.log(IngDropdown)
        let set = new Set(AllIng)
        // console.log(set)
        set.forEach(element => {
            let IngLi = document.createElement('li')
            IngLi.innerHTML = element
            IngUL.appendChild(IngLi)
            // console.log(element)
        })
        // make the button dropdown display the list

        document.addEventListener('click', (e) => {
            var list = e.target.closest('button')
            console.log(list)
            var next = list.nextElementSibling
            next.classList = 'show'
            console.log(next)
        })
        // let dropdowns = document.getElementsByClassName("dropdown-menu");
        // console.log(dropdowns)
        // window.onclick = function (event) {
        //     if (event.target.matches('dropdown')) {
        //         event.target.nextSibling.classList.add('show');

        //         console.log(dropdowns)
        //         var i;
        //         for (i = 0; i < dropdowns.length; i++) {
        //             var openDropdown = dropdowns[i];
        //             if (openDropdown.classList.contains('show')) {
        //                 openDropdown.classList.remove('show');
        //             }
        //         }
        //     }
    }






}






const app = new App()
app.displayData()

