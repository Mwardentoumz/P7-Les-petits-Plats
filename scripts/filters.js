export function emptyFilters(){
    let filter1 = document.getElementById('ingrédients')
    let filter2 = document.getElementById('Ustensiles')
    let filter3 = document.getElementById('Appliances')
    filter1.innerHTML = ""
    filter2.innerHTML = ""
    filter3.innerHTML = ""
}

// générer la liste des filtres
export function listeIngrédients(element) {
    let IngDropdown = document.getElementById('ingrédients')
    let set1 = new Set(element)
    // console.log(set1)
    set1.forEach(element => {
        let IngLi = document.createElement('a')
        IngLi.setAttribute('href', '#')
        IngLi.classList = 'dropdown-item'
        IngLi.classList.add('blue')
        IngLi.innerHTML = " " + element
        IngDropdown.appendChild(IngLi)

    })
}
export function listeUstensiles(element) {
    let UstDropdown = document.getElementById('Ustensiles')
    let set2 = new Set(element)
    // console.log(set2)
    set2.forEach(element => {

        let UstLi = document.createElement('a')
        UstLi.setAttribute('href', '#')
        UstLi.classList = 'dropdown-item'
        UstLi.classList.add('green')
        UstLi.innerHTML = " " + element
        UstDropdown.appendChild(UstLi)
    })
}
export function listesAppareils(element) {
    let AppDropdown = document.getElementById('Appliances')
    let set3 = new Set(element)
    // console.log(set3)
    set3.forEach(element => {

        let AppLi = document.createElement('a')
        AppLi.setAttribute('href', '#')
        AppLi.classList = 'dropdown-item'
        AppLi.classList.add('red')
        AppLi.innerHTML = " " + element
        AppDropdown.appendChild(AppLi)
    })
}
// gérer l'évenement toggle sur les listes déroulantes
export function gestionClic() {
    let filterClickEvent = document.getElementById('clickEvent')
    filterClickEvent.addEventListener('click', (e) => {
        var list = e.target.closest('button')
        var closeInputField = list.parentNode.parentNode
        if (list.nextElementSibling.classList.contains('show')) {
            list.ariaExpanded = 'false'
            closeInputField.classList.remove('expanded')
            list.nextElementSibling.classList.remove('show')
            list.nextElementSibling.style.display = 'none'
        } else {
            list.ariaExpanded = 'true'
            closeInputField.classList.add('expanded')
            list.nextElementSibling.classList.add('show')
            list.nextElementSibling.style.display = 'inline-block'
        }                                                                           

    })
}
// eventListener sur un clic dans la liste des filtres
export function clickonFilters() {
    let clicktarget = document.getElementsByClassName('dropdown-item')
    for (let item of clicktarget) {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            let btnValue = e.target.innerHTML
            
            createButton(btnValue, e)
            // buttonColor(e)
        })
    }
}

// vercel

// créer le bouton lors du clic dans les filtres
function createButton(btnValue,e) {
    let newFilter = document.createElement('button')
    newFilter.classList.add('btnfilters')
    let closeIcon = ` <span class="material-symbols-outlined">cancel</span>`
    newFilter.innerHTML = btnValue + closeIcon
    let colorTest = e.target.classList
    console.log(newFilter)
    if(colorTest.contains('blue')){
        newFilter.style.backgroundColor = '#3282F7';
    } else if(colorTest.contains('green')){
        newFilter.style.backgroundColor = '#68D9A4';
    } else if(colorTest.contains('red')){
        newFilter.style.backgroundColor = '#ED6454';
    } 
    
    let btnPlacement = document.getElementById('filtres-active')
    btnPlacement.appendChild(newFilter)
    removeFilter(newFilter)
}

// écouter le champ de chaque liste
export function listenInputFilters(){
    document.addEventListener('click', (e) => {
        var input = e.target
        console.log(input)
    })
}

// fonction pour retirer le filtre
function removeFilter(newFilter) {
    newFilter.addEventListener('click', (e) => {
        e.preventDefault()
        newFilter.remove()
    })
}
