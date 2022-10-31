// ELEMENT DOM

const overlayForm = document.querySelector('.overlay-form')

// ingrédients

const ingredientsDropdown = document.getElementById(
	'ingredients-container-dropdown'
);
const ingredientsSearch = document.getElementById('ingredients-search');
const ingredientsBtnChevron = document.getElementById(
	'ingredients-btn-chevron'
);
const ingredientsContainerTags = document.getElementById(
	'ingredients-container-tags'
);

// Appliances
const appliancesDropdown = document.getElementById(
	'appliances-container-dropdown'
);
const appliancesSearch = document.getElementById('appliances-search');
const appliancesBtnChevron = document.getElementById('appliances-btn-chevron');
const appliancesContainerTags = document.getElementById(
	'appliances-container-tags'
);

// Ustensils
const ustensilsDropdown = document.getElementById(
	'ustensils-container-dropdown'
);
const ustensilsSearch = document.getElementById('ustensils-search');
const ustensilsBtnChevron = document.getElementById('ustensils-btn-chevron');
const ustensilsContainerTags = document.getElementById(
	'ustensils-container-tags'
);

// ========================================
// Gérer les dropdowns avec des fonctions
// ========================================

// cette fonction sert à gérer l'ouverture des dropdowns
function openDropdown(dropdown, containerTags, inputDropdown, btnChevron) {
    console.log(dropdown)
	overlayForm.classList.remove('hidden');
	dropdown.classList.add('expanded');
	dropdown.ariaExpanded = 'true';
	containerTags.classList.remove('hidden');
	containerTags.ariaHidden = 'false';
	btnChevron.style.background =
		'url(../assets//images/chevron-up.svg) center center / 16px 11px no-repeat';
	switch (inputDropdown.id) {
		case 'ingredients-search':
			inputDropdown.placeholder = 'Recherche un ingrédient';
			break;
		case 'appliances-search':
			inputDropdown.placeholder = 'Recherche un appareil';
			break;
		case 'ustensils-search':
			inputDropdown.placeholder = 'Recherche un ustensile';
			break;
	}
}

// cette fonction ferme les dropdowns
function closeDropdown(dropdown, containerTags, inputDropdown, btnChevron) {
    // console.log(dropdown)
	overlayForm.classList.add('hidden');
	dropdown.classList.remove('expanded');
	dropdown.ariaExpanded = 'false';
	containerTags.classList.add('hidden');
	containerTags.ariaHidden = 'true';
	btnChevron.style.background =
		'url(../assets/images/chevron-down.svg) center center / 16px 11px no-repeat';
	inputDropdown.value = '';
	switch (inputDropdown.id) {
		case 'ingredients-search':
			inputDropdown.placeholder = 'Ingrédients';
			break;
		case 'appliances-search':
			inputDropdown.placeholder = 'Appareils';
			break;
		case 'ustensils-search':
			inputDropdown.placeholder = 'Ustensiles';
			break;
	}
}

// cette fonction gére le dropdown ingrédients
function handlerDropdownIngredients() {
	if (!ingredientsDropdown.classList.contains('expanded')) {
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
		closeDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
		openDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
		trapFocusDropdown(ingredientsDropdown);
	} else {
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
	}
}

// cette fonction gère le dropdown des appareils
function handlerDropdownAppliances() {
	if (!appliancesDropdown.classList.contains('expanded')) {
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
		closeDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
		openDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
		trapFocusDropdown(appliancesDropdown);
	} else {
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
	}
}

// cette fonction gère le dropdown des ustensiles
function handlerDropdownUstensils() {
	if (!ustensilsDropdown.classList.contains('expanded')) {
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
		openDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
		trapFocusDropdown(ustensilsDropdown);
	} else {
		closeDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
	}
}

function closeAllDropdowns() {
	if (
		ingredientsDropdown.classList.contains('expanded') ||
		appliancesDropdown.classList.contains('expanded') ||
		ustensilsDropdown.classList.contains('expanded')
	) {
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
		closeDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
	}
}

//=====================================
// Gérer le focus de chaque dropdown
//=====================================

// chaque élément focusable

let focusableElement = 'button, [href], input'
let modal;
let firstFocusableElement;
let focusableContent;
let lastFocusableElement;

// aim the focus inside the form
function trapFocusDropdown(dropdownType){
    modal = dropdownType // select the modal by Id
    firstFocusableElement = modal.querySelectorAll(focusableElement)[0]; // retrouve le premier element focus dans la modale
    focusableContent = modal.querySelectorAll(focusableElement);
    lastFocusableElement = focusableContent[focusableContent.length -1]; // retrouve le dernier element focus dans la modale
    trapFocus();

}

// fonction pour définir le focus
function trapFocus() {
	document.addEventListener('keydown', function (e) {
		let isTabPressed = e.key === 'Tab' || e.key === 9;
		if (!isTabPressed) {
			return;
		}
		if (e.shiftKey) {
			// if shift key pressed for shift + tab combination
			if (document.activeElement === firstFocusableElement) {
				e.preventDefault();
				lastFocusableElement.focus(); // add focus for the last focusable element
			}
		} else {
			// if tab key is pressed
			if (document.activeElement === lastFocusableElement) {
				e.preventDefault();
				// if focused has reached to last focusable element then focus first focusable element after pressing tab
				firstFocusableElement.focus(); // add focus for the first focusable element
			}
		}
	});
	firstFocusableElement.focus();
}
// ==========================================
// Events de la page
// ==========================================

ingredientsBtnChevron.addEventListener('click', handlerDropdownIngredients);
appliancesBtnChevron.addEventListener('click', handlerDropdownAppliances);
ustensilsBtnChevron.addEventListener('click', handlerDropdownUstensils);

document.addEventListener('keydown', function (e) {
	// console.log(e.key);
	if (e.key === 'Escape') {
		closeAllDropdowns();
	}
});

overlayForm.addEventListener('click', () => {
	console.log('overlay click');
	closeAllDropdowns();
});