document.addEventListener("DOMContentLoaded", function () {
    let pokemonRepository = (function () {


       

        let pokemonList = []; //list to store fetched pokemon
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


        // addListItem function

        function addListItem(pokemon) {
            var pokemonListElement = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.classList.add('pokemon-button');
            button.innerText = pokemon.name;

            // event listener for the buttons
            button.addEventListener('click', function (event) {
                showDetails(pokemon);
            });

            listItem.appendChild(button);
            pokemonListElement.appendChild(listItem);
        }

        function loadList() {
            return fetch(apiUrl)
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    json.results.forEach(function (item) {
                        // create a pokemon object with name and detailsUrl
                        let pokemon = {
                            name: item.name,
                            detailsUrl: item.url
                        };
                        add(pokemon);
                        console.log(pokemon)
                    });
                }).catch(function (e) {
                    console.error(e)
                })
        }

        function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (details) {
                // assign fetched details to pokemon object
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            }).catch(function (e) {
                console.error(item)
            })
        }



        function add(item) {
            if  (typeof item === "object" &&
                "name" in item) {
                pokemonList.push(item);

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
            loadDetails: loadDetails
        };



    })();




    function showDetails(pokemon) {
        console.log(pokemon.name);
    }


    // Load pokemon list and details, then render list items
    pokemonRepository.loadList().then(function() {
        let allPokemon = pokemonRepository.getAll();

        Promise.all (allPokemon.map(pokemonRepository.loadDetails))
        .then (function () {
            allPokemon.forEach (function (pokemon) {
                pokemonRepository.addListItem(pokemon);

            })
        })

      
    });
});
