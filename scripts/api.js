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
                
                console.log(data)
                return data
            })
                

            .catch(err => console.log('an error occurs', err))
    
}
    // async getPhotographerById(userId) {
    //     return fetch(this._url)
    //         .then(response => response.json())
    //         .then(response => {
    //             return response.photographers.filter(photographer => photographer.id === userId)[0]
    //         })
    //         .catch(err => {
    //             throw new Error('La requete api getPhotographer a échoué : ', err)
    //         })
    // }
    // async getMediasById(photographerId) {
    //     return fetch(this._url)
    //         .then(response => response.json())
    //         .then(response => {
    //             return response.media.filter(element => element.photographerId === photographerId )
                
    //         })
    //         .catch(err => {
    //             throw new Error('La requete api getMedia a échoué : ', err)
    //         })
    // }

//   /**
//    * requete API simulation get tous les media avec l'id du photographe
//    * @returns {Promise}
//    */
//   async getAllMedias () {
//     return fetch(this._url)
//       .then(response => response.json())
//       .then(response => {
//         console.log(response.media)
//         return response.media
//       })
//       .catch(err => {
//         throw new Error('La requete api getPhotographer a échoué : ', err)
//       })
//   }
// }

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