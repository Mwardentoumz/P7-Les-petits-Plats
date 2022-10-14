import { RecipeCard } from './RecipeFactory.js'
import { clickonFilters, gestionClic, listeIngrédients, listeUstensiles, listesAppareils } from './filters.js';
import { findInTitle, findInIngredients, findInDescription, concatener} from './searchAlgo.js'



// DOM ELEMENTS
const mainsearch = document.getElementById('mainsearch')
const RecipesSection = document.getElementById("deck");

// INITIATE ARAYS
let resultsIngredients = []
let resultsDescriptions = []
let resultsTitles = []
let resultsConcat = []
let AllIng = []
let AllUstensils = []
let AllAppliance = []
let concat = []


class App {
    constructor() {
        // retrieve the data
        this.RecipesApi = new RecipesApi('../assets/data/recipes.json')
    }
    // cette fonction récupère l
    async getApi() {
        return await this.RecipesApi.getRecipes()
    }
    // pour afficher les éléments sans recherche et en cas de retour à pas de recherche
    async displayData(element) {
        const NewRecipe = element.map(data => new RecipeCard(data))
        // boucler dans les élements récuperés pour créer les cartes
        NewRecipe.forEach(element => {
            element.$wrapperCard = document.createElement('div')
            // push elements into arrays for filters
            const arr = element.ingredients
            
            let Appslice = element._appliance.split(',')
            console.log(element._ustensils)
            for (let i = 0; i < element._ustensils.length; i++){
                AllUstensils.push(element._ustensils[i])
            }
            AllAppliance.push(Appslice[0])
            // générer la liste d'ingrédients
            this.makeUL(arr)
            // contenu HTML des cartes
            var card = `
                    <div id"cards" class="card center mb-5 mw-25">
                        <img id="cartesimg" class="card-img-top" src="../assets/data/images/${element._name}.jpg" alt="Card image cap">
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
                                <div id="descriptioncard" class="col-sm-6">${element._description}</div>
                            </div>
                        </div>
                    </div>`
            element.$wrapperCard.innerHTML = card
            RecipesSection.appendChild(element.$wrapperCard)
        })
        listeIngrédients(AllIng)
        listeUstensiles(AllUstensils)
        listesAppareils(AllAppliance)
        console.log(AllUstensils)
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
        console.log(concat)
        mainsearch.addEventListener('keyup', (e) => {
            e.preventDefault()
            const inputValue = String(e.target.value).toLowerCase();
            if (inputValue.length >= 3) {
                RecipesSection.innerHTML = ""
                this.findInTitle(inputValue, RecipesData)
                this.findInIngredients(inputValue, RecipesData)
                this.findInDescription(inputValue, RecipesData)
                this.concatener(resultsTitles, resultsDescriptions, resultsIngredients)
                this.displayData(concat)
            } else if (inputValue.length < 3) {
                RecipesSection.innerHTML = ""
                this.displayData(RecipesData)
            }
        })
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
// app.input()

