let pokemonRepository = (function () {
  let pokemonList = []; //list to store fetched pokemon
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";

  // addListItem function
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".list-group");

    let listPokemon = document.createElement("a");
    listPokemon.classList.add("list-group-element");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.innerText = pokemon.name;

    listPokemon.appendChild(button);
    pokemonListElement.appendChild(listPokemon);

    // event listener for the buttons
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          // create a pokemon object with name and detailsUrl
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // assign fetched details to pokemon object
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(item);
      });
  }

  function showDetails(pokemon) {
    // Call the showModal function with the clicked pokemon details
    showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imageUrl);
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon data is incorrec");
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,

    // reset search list
    resetList: function () {
      const pokemonListElement = document.querySelector("#pokemon-list");
      pokemonListElement.innerHTML = "";

      this.getAll().forEach((pokemon) => {
        this.addListItem(pokemon);
      });
    },
  };
})();

//Modal added
// function to show modal
function showModal(pokemonName, pokemonHeight, pokemonImage) {
  let modal = document.querySelector("#pokemonModal");
  let modalTitle = modal.querySelector(".modal-title");
  let modalImage = modal.querySelector("#pokemonImage");
  let modalHeight = modal.querySelector("#pokemonHeight");

  modalTitle.innerText = pokemonName;
  modalImage.src = pokemonImage;
  modalImage.alt = pokemonName;
  modalHeight.innerText = pokemonHeight;

  $(modal).modal("show");
}

//hide modal function
function hideModal() {
  let modal = document.querySelector("#modal");
  modal.classList.remove("is-visible");
}

//event listener to close modal when clicking 'esc'
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideModal();
  }
});

// Function to filter and display Pokémon based on the search term
function searchPokemon(keyword) {
  const pokemonListElement = document.querySelector("#pokemon-list");
  pokemonListElement.innerHTML = "";

  const filteredPokemon = pokemonRepository.getAll().filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(keyword.toLowerCase());
  });

  filteredPokemon.forEach((pokemon) => {
    let listPokemon = document.createElement("a");
    listPokemon.classList.add("list-group-element");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.innerText = pokemon.name;

    listPokemon.appendChild(button);
    pokemonListElement.appendChild(listPokemon);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  });
}

// Load pokemon list and details, then render list items
pokemonRepository.loadList().then(function () {
  let allPokemon = pokemonRepository.getAll();

  Promise.all(allPokemon.map(pokemonRepository.loadDetails)).then(function () {
    allPokemon.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.trim();
  if (keyword === "") {
    pokemonRepository.resetList();
  } else {
    searchPokemon(keyword);
  }
});

//pokemonRepository.loadList().then(function () {
//let allPokemon = pokemonRepository.getAll();

// Promise.all(allPokemon.map(pokemonRepository.loadDetails)).then(function () {
//allPokemon.forEach(function (pokemon) {
//pokemonRepository.addListItem(pokemon);
