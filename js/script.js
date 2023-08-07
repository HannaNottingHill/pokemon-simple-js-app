
let pokemonRepository = (function () {
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
        add: add
    };

})();
// Selecting the unordered list
var pokemonListElement = document.querySelector ('.pokemon-list');

pokemonRepository.getAll().forEach ((pokemon) => {
    //listn element
 let listItem = document.createElement ('li');
  //button element 
  let button = document.createElement ('button');

  button.classList.add ('pokemon-button');
  // adding pokemon name to the button
  button.innerText = pokemon.name;

  // appened the button to the li item as it's child
  listItem.appendChild(button);
 pokemonListElement.appendChild(listItem);
  
});
