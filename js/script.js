let pokemonList = [
    { name: "Vulpix", height: "2.00 ", type: "Fire" },
    { name: "Pikachu", height: "1.04 ", type: "Electric" },
    { name: "Snorlax", height: "6.11 ", type: "Normal" },
    { name: "Rapidash", height: "5.07 ", type: "Fire" },
    { name: "Onix", height: "28.10 ", type: ["Rock", "Ground"] },
    { name: "Seadra", height: "3.11 ", type: "Water" },
    { name: "Charizard", height: "5.07 ", type: ["Fire", "Flying"] },
    { name: "Balbasaur", height: "2.04 ", type: ["Gras", "Poison"] }
]

// New in HTML (loop) Pokemon Name (height: xx) 
for (i = 0; i < pokemonList.length; i++) {
    const pokemon = pokemonList[i];
    const pokemonInfo =  `${pokemon.name} (height: ${pokemon.height})`


    if (pokemon.height > 5) {
        pokemonInfo+= " -Wow, so tall!!"

    }

    else if (pokemon.height < 3) {
        pokemonInfo+=" -So cute!!"
    }

    else {
        pokemonInfo
    }

    document.write(pokemonInfo);
}