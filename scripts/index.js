import { RecipeCard } from './RecipeFactory.js'

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
        // retrieve the deck section to insert recipes cards

        // store promess of fetch request


        // map the card object with fetch data

    }

    async getApi() {
        return await this.RecipesApi.getRecipes()
    }
    // pour afficher les éléments sans recherche et en cas de retour à pas de recherche
    async displayData(element) {
        // clear deck inner HTML
        
        // initiate empty arrays for later filters data
        let set1 = []
        let set2 = []
        let set3 = []
        
        const NewRecipe = element.map(data => new RecipeCard(data))

        // loop through our new objects to create cards
        NewRecipe.forEach(element => {
            element.$wrapperCard = document.createElement('div')
            const arr = element.ingredients
            // separate appliances into unique elements
            let Appslice = element._appliance.split(',')
            // push elements into arrays for filters
            AllUstensils.push(element._ustensils)
            AllAppliance.push(Appslice[0])
            // this function generates a list for ingredients inside the recipe card
            this.makeUL(arr)
            // this is the HTML for the cards
            var card = `
                    <div class="card center mb-5" style="width: 32rem; max-height: 600px">
                        <img class="card-img-top" src="../assets/data/grey.jpg" alt="Card image cap">
                        <div class="card-body">
                            <div class="row header">
                                <h2 class="card-title">${element._name}</h2>
                                <div class="time">
                                    <span class="material-symbols-outlined">schedule</span>
                                    <h1 class="card-subtitle">${element._time}</h1>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">${this.makeUL(arr)}</div>
                                <div class="col-sm-6 text-wrap">${element._description}</div>
                            </div>
                        </div>
                    </div>`
                    element.$wrapperCard.innerHTML = card

            RecipesSection.appendChild(element.$wrapperCard)
        })
        // cette fonction reprends les ingrédients lorsque la boucle est initiée et génère la liste des ingrédients

        // return a list of elements under the dropdown button for ingredients
        let IngDropdown = document.getElementById('ingrédients')
        let IngUL = document.createElement('ul')
        IngDropdown.appendChild(IngUL)
        set1 = new Set(AllIng)

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
        set2 = new Set(AllUstensils)
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
        set3 = new Set(AllAppliance)
        set3.forEach(element => {

            let AppLi = document.createElement('a')
            AppLi.setAttribute('href', '#')
            AppLi.classList = 'dropdown-item'
            AppLi.innerHTML = " " + element
            AppUl.appendChild(AppLi)
        })

        // toggle event for the filters buttons
        let filterClickEvent = document.getElementById('clickEvent')
        filterClickEvent.addEventListener('click', (e) => {


            var list = e.target.closest('button')
            if (list.nextElementSibling.classList.contains('show')) {
                list.nextElementSibling.classList.remove('show')
                list.nextElementSibling.style.display = 'none'
            } else {
                list.nextElementSibling.classList.add('show')
                list.nextElementSibling.style.display = 'inline-block'
            }

        })

    }
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
            } else if(inputValue.length < 3){
                RecipesSection.innerHTML = ""
                this.displayData(RecipesData)
            }
        })
    }
    
    // cette fonction recherche le résultat de l'input dans les titres des recettes
    findInTitle(inputValue, RecipesData) {
        resultsTitles = []
        for (let i = 0; i < RecipesData.length; i++) {
            if (RecipesData[i].name.toLowerCase().includes(inputValue)) {
                resultsTitles.push(RecipesData[i])
            }
        }
        
    }
    // cette fonction recherche le résultat de l'input dans les descriptions des recettes
    findInDescription(inputValue, RecipesData){
        resultsDescriptions = []
        for (let i=0; i < RecipesData.length; i++){
            if (RecipesData[i].description.toLowerCase().includes(inputValue)){
                resultsDescriptions.push(RecipesData[i])
            }
        }
    }
    // cette fonction recherche le résultat de l'input dans les ingrédients des recettes
    findInIngredients(inputValue, RecipesData){
        resultsIngredients = []
        for (let i=0; i < RecipesData[i].length; i++){
            if(RecipesData[i].ingredients.toLowerCase().includes(inputValue)){
                resultsIngredients.push(RecipesData[i])
            }
        }
    }
    // concatener les 3 résultats ensembles
    concatener(resultsTitles, resultsDescriptions, resultsIngredients){
        resultsConcat = resultsTitles.concat(resultsDescriptions, resultsIngredients)
        // console.log(resultsConcat)
        concat = Array.from(new Set(resultsConcat))
        console.log(concat)
        let element = concat.map(data => new RecipeCard(data))
        console.log(element)
        
        
        
    }
    // retirer les cartes avant de boucler pour afficher le résultat de recherche
    removeCards(){
        let cards = document.getElementsByClassName('card center mb-5')
        for(let i=0; i <cards.length; i++){
            const card = cards[i]
            card.remove()
        }
    }
    async init() {

        // const RecipesData = await this.getApi()
        let RecipesData = await this.getApi()
        this.displayData(RecipesData)
        this.listenInput(RecipesData)
    }
    
}

const app = new App()
app.init()
// app.input()

