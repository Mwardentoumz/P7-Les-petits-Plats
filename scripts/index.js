
import { RecipeCard } from './RecipeFactory.js'
import { clickonFilters, gestionClic, listeIngrédients, listeUstensiles, listesAppareils, emptyFilters, listenInputFilters } from './filters.js'



// DOM ELEMENTS
const mainsearch = document.getElementById('mainsearch')
const RecipesSection = document.getElementById("deck");

// INITIATE ARAYS
let AllIng = []
let AllUstensils = []
let AllAppliance = []
let concat = []

class App {
    constructor() {
        // retrieve the data
        this.RecipesApi = new RecipesApi('./assets/data/recipes.json')
    }
    // cette fonction récupère l
    async getApi() {
        return await this.RecipesApi.getRecipes()
    }
    // pour afficher les éléments sans recherche et en cas de retour à pas de recherche
    async displayData(element) {
        console.log(element)
        AllIng = []
        AllUstensils = []
        AllAppliance = []
        const NewRecipe = element.map(data => new RecipeCard(data))
        // boucler dans les élements récuperés pour créer les cartes
        NewRecipe.forEach(element => {
            element.$wrapperCard = document.createElement('div')
            // push elements into arrays for filters
            let arr = element.ingredients
            // console.log(arr)
            // let Appslice = element._appliance.split(',')
            for (let i = 0; i < element._ustensils.length; i++) {
                AllUstensils.push(element._ustensils[i])
            }
            for (let i = 0; i < element._appliance.length; i++) {
                AllAppliance.push(element._appliance)
            }
            // générer la liste d'ingrédients
            this.makeUL(arr)
            // contenu HTML des cartes
            var card = `
                    <div id"cards" class="card center mb-5 mw-25">
                        <img id="cartesimg" class="card-img-top" src="./assets/data/images/${element._name}.jpg" alt="Card image cap">
                        <div class="card-body">
                            <div class="row header">
                                <h2 class="card-title">${element._name}</h2>
                                <div class="time">
                                    <span id="clock" class="material-symbols-outlined">schedule</span>
                                    <h1 class="card-subtitle">${element._time}</h1>
                                </div>
                            </div>
                            <div id="listdesc" class="row">
                                <div id="listecard" class="col-sm-6">${this.makeUL(arr)}</div>
                                <div id="descriptioncard" class="col-sm-6 text-justify">${element._description}</div>
                            </div>
                        </div>
                    </div>`
            element.$wrapperCard.innerHTML = card
            RecipesSection.appendChild(element.$wrapperCard)
        })
        listeIngrédients(AllIng)
        listeUstensiles(AllUstensils)
        listesAppareils(AllAppliance)
        console.log(AllIng)
    }

    // cette fonction gère la liste des ingrédients dans chaque carte
    makeUL(arr) {
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
    // cette fonction écoute le champ de recherche principal
    listenInput(RecipesData) {
        mainsearch.addEventListener('keyup', (e) => {
            e.preventDefault()
            const inputValue = String(e.target.value).toLowerCase();
            if (inputValue.length >= 3) {
                RecipesSection.innerHTML = ""
                emptyFilters()
                this.filterRecipe(inputValue, RecipesData)
                this.displayData(concat)
                clickonFilters()
            } else if (inputValue.length < 3) {
                RecipesSection.innerHTML = ""
                emptyFilters()
                this.displayData(RecipesData)
                clickonFilters()
            }
        })
    }
    // filtre avec le champ de la recherche principale - on écarte chaque élément qui ne contient pas le valeur de recherche dans un des 3 champ de recherche
    filterRecipe(inputValue, RecipesData) {
        let result = RecipesData.filter(
            element => 
            element.name.toLowerCase().includes(inputValue) ||
            element.description.toLowerCase().includes(inputValue) ||
            element.ingredients.includes(inputValue))
            concat = result.map(data => new RecipeCard(data))
    }

    async init() {
        // const RecipesData = await this.getApi()
        let RecipesData = await this.getApi()
        this.displayData(RecipesData)
        this.listenInput(RecipesData)
        clickonFilters()
        gestionClic()
    }

}

const app = new App()
app.init()


