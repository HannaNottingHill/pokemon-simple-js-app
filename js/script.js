document.addEventListener("DOMContentLoaded", function () {
  let pokemonRespiratory = (function () {
    let pokemonList = []; //list to store fetched pokemon
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";

    // addListItem function
    function addListItem(pokemon) {
      let pokemonListElement = document.querySelector(".pokemon-list");

      let listpokemon = document.createElement("li");
      let button = document.createElement("button");

      button.classList.add("pokemon-button");
      button.innerText = pokemon.name;

      listpokemon.appendChild(button);
      pokemonListElement.appendChild(listpokemon);

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
    };
  })();

  //Modal added

  // function to show modal
  function showModal(pokemonName, pokemonHeight, pokemonImage) {
    //Modal added
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.add("is-visible");

    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.id = "modal";
    modal.classList.add("modal");

    //close button element
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "close";

    closeButtonElement.addEventListener("click", hideModal);

    // title element
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemonName;

    //p element
    let contentElement = document.createElement("p");
    contentElement.innerText = pokemonHeight;

    //Pokemon image!!

    let imgconatiner = document.createElement("div");
    imgconatiner.classList.add("img-container");
    let pokemonImg = document.createElement("img");
    //pokemonImage.src = item.url;

    pokemonImg.src = pokemonImage;
    pokemonImg.alt = pokemonName;

    //pokemonImg = pokemonHeight;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modal.appendChild(imgconatiner);
    imgconatiner.appendChild(pokemonImg);

    modal.classList.add("is-visible");
  }

  // hide modal function
  function hideModal() {
    let modal = document.querySelector("#modal-container");
    modal.classList.remove("is-visible");
  }

  // event listener to close modal when clicking 'esc'
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModal();
    }
  });

  // Load pokemon list and details, then render list items
  pokemonRespiratory.loadList().then(function () {
    let allPokemon = pokemonRespiratory.getAll();

    Promise.all(allPokemon.map(pokemonRespiratory.loadDetails)).then(
      function () {
        allPokemon.forEach(function (pokemon) {
          pokemonRespiratory.addListItem(pokemon);
        });
      }
    );
  });
});
