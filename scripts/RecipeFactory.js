export class RecipeCard {
    constructor(data){

        this._id = data.id
        this._name = data.name
        this._servings = data.servings
        this._ingredients = data.ingredients
        this._time = data.time
        this._description = data.description
        this._appliance = data.appliance
        this._ustensils = data.ustensils
        
        this.$wrapperCard = null
               
    }

    get id(){
        return this._id
    }
    get name(){
        return this._name
    }
    get servings(){
        return this._servings
    }
    get ingredients(){
        return this._ingredients
    }
    get time(){
        return this._time
    }
    get description(){
        return this._description
    }
    get appliance(){
        return this._appliance
    }
    get ustensils(){
        return this._ustensils
    }

    get createRecipeCard(){
        return createRecipeCard()
    }

    get image(){
        return "../assets/${this._name}"
    }
    // createRecipeCard(){
    //     this.$wrapperCard = document.createElement('div')
        
    //     const card = `
    //             <div class="card" style="width: 18rem;">
    //                 <img class="card-img-top" src="../assets/data/grey.jpg" alt="Card image cap">
    //                 <div class="card-body">
    //                     <aside>
    //                         <h2 class="card-title">${this._name}</h2>
    //                         <h3 class="card-subtitle">${[this._ingredients]}</h3>
    //                     </aside>
    //                     <aside>
    //                         <h2 class="card-title">${this._time}</h2>
    //                         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                     </aside>
                    
    //                 </div>
    //             </div>
    //         `


        
    //     this.$wrapperCard.innerHTML = card
    //     return this.$wrapperCard    
    // };

 }


