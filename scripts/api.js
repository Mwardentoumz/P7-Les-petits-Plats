class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then(response => response.json())
            .then(data => {
                
                // console.log(data)
                return data
            })
                

            .catch(err => console.log('an error occurs', err))
    
}
    
}
class RecipesApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getRecipes() {
        return await this.get()

    }
}