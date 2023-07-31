
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


var allPokemons = pokemonRepository.getAll();

allPokemons.forEach((pokemon) =>
{document.write(pokemon.name + ' is ' + pokemon.height + 'tall' + '<br>');
});
