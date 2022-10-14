// cette fonction recherche le résultat de l'input dans les titres des recettes
export function searchAlgo() {
    resultsTitles = []
    RecipesData.forEach(element => {
        console.log(element)
        // if (element.includes(inputValue)){
        //     let resultsConcat = []
        //     resultsConcat.push(element)
        //     console.log(resultsConcat)
        //     concat = Array.from(new Set(resultsConcat))
        //     console.log(concat)
        //     let element = concat.map(data => new RecipeCard(data))
        // }    
    });
}
//     for (let i = 0; i < RecipesData.length; i++) {
//         if (RecipesData[i].name.toLowerCase().includes(inputValue)) {
//             resultsTitles.push(RecipesData[i])
//         }
//     }

// }

// // cette fonction recherche le résultat de l'input dans les descriptions des recettes
// export function findInDescription(inputValue, RecipesData) {
//     resultsDescriptions = []
//     for (let i = 0; i < RecipesData.length; i++) {
//         if (RecipesData[i].description.toLowerCase().includes(inputValue)) {
//             resultsDescriptions.push(RecipesData[i])
//         }
//     }
// }

// // cette fonction recherche le résultat de l'input dans les ingrédients des recettes
// export function findInIngredients(inputValue, RecipesData) {
//     resultsIngredients = []
//     for (let i = 0; i < RecipesData[i].length; i++) {
//         if (RecipesData[i].ingredients.toLowerCase().includes(inputValue)) {
//             resultsIngredients.push(RecipesData[i])
//         }
//     }
// }

// // concatener les 3 résultats ensembles
// export function concatener(resultsTitles, resultsDescriptions, resultsIngredients) {
//     resultsConcat = resultsTitles.concat(resultsDescriptions, resultsIngredients)
//     // console.log(resultsConcat)
//     concat = Array.from(new Set(resultsConcat))
//     console.log(concat)
//     let element = concat.map(data => new RecipeCard(data))
//     console.log(element)
// }