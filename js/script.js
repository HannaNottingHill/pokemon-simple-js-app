document.addEventListener ("DOMContentLoaded", function() {
let pokemonRepository = (function () {

    // addListItem function
    // addListItem

    function addListItem(pokemon) {

        var pokemonListElement = document.querySelector('.pokemon-list');
        
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.classList.add('pokemon-button');
        button.innerText = pokemon.name;
 // event listener for the buttons
        button.addEventListener('click', function () {
            showDetails(pokemon); // calls the showDetails function
        });

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

  
//Pokemon List

let pokemonList = [
    { name: "Vulpix", height: "2.00 ", type: "Fire" },
    { name: "Pikachu", height: "1.04 ", type: "Electric" },
    { name: "Snorlax", height: "6.11 ", type: "Normal" },
    { name: "Rapidash", height: "5.07 ", type: "Fire" },
    { name: "Onix", height: "28.10 ", type: ["Rock", "Ground"] },
    { name: "Seadra", height: "3.11 ", type: "Water" },
    { name: "Charizard", height: "5.07 ", type: ["Fire", "Flying"] },
    { name: "Balbasaur", height: "2.04 ", type: ["Gras", "Poison"] }
];


function getAll() {
    return pokemonList;
}

function add(item) {
    pokemonList.push(item)
}

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };

    

})();


 //Event listener  for each pokemon, showDetails

 function showDetails (pokemon) {
    console.log (pokemon.name);
   }

pokemonRepository.getAll().forEach ((pokemon) => {
   pokemonRepository.addListItem(pokemon);
    });

});