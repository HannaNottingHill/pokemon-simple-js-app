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
       
       //Modal added
       let modalContainer = document.querySelector('#modal-container');

       // hide modal function
       function hideModal () {
        modalContainer.classList.remove('is-visible');
       }
       
       // event listener to close modal when clicking outside
       window.addEventListener('click', (e) => {
        let target = e.target;
        if (target=== modalContainer) {
            hideModal();
        }
       });

       //event listener to open modal when pokemon is clicked
       document.querySelector('.pokemon-list').addEventListener('click', function (event) {
        const clickedPokemon = pokemonRepository.getAll().find(pokemon => pokemon.name === event.target.innerText);
        if (clickedPokemon) {

            showModal(clickedPokemon.name, `Height: ${clickedPokemon.height}`, 
            clickedPokemon.imageUrl);}
        });
    

    // function to show modal
    function showModal (title, text) {
        modalContainer.innerHTML='';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //close button element 
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close')
        closeButtonElement.innerText = 'close';


        closeButtonElement.addEventListener('click', hideModal);

        
        // title element
        let titleElement = document.createElement('h1');
        titleElement.innerText= title;

        //p element
        let contentElement =document.createElement ('p');
        contentElement.innerText = text;



        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
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
    }

});
