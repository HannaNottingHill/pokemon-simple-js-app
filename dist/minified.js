let pokemonRepository = (function () {
  let e = [];
  function t(t) {
    "object" == typeof t && "name" in t
      ? e.push(t)
      : console.log("Pokemon data is incorrec");
  }
  function n() {
    return e;
  }
  return {
    getAll: n,
    add: t,
    addListItem: function e(t) {
      let n = document.querySelector(".list-group"),
        o = document.createElement("a");
      o.classList.add("list-group-element");
      let i = document.createElement("button");
      i.classList.add("btn", "btn-primary"),
        (i.innerText = t.name),
        o.appendChild(i),
        n.appendChild(o),
        i.addEventListener("click", function (e) {
          var n;
          (n = t), showModal(n.name, `Height: ${n.height}`, n.imageUrl);
        });
    },
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            let n = { name: e.name, detailsUrl: e.url };
            t(n), console.log(n);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: function e(t) {
      return fetch(t.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          (t.imageUrl = e.sprites.front_default),
            (t.height = e.height),
            (t.types = e.types);
        })
        .catch(function (e) {
          console.error(t);
        });
    },
    resetList: function () {
      let e = document.querySelector("#pokemon-list");
      (e.innerHTML = ""),
        this.getAll().forEach((e) => {
          this.addListItem(e);
        });
    },
  };
})();
function showModal(e, t, n) {
  let o = document.querySelector("#pokemonModal"),
    i = o.querySelector(".modal-title"),
    r = o.querySelector("#pokemonImage"),
    l = o.querySelector("#pokemonHeight");
  (i.innerText = e),
    (r.src = n),
    (r.alt = e),
    (l.innerText = t),
    $(o).modal("show");
}
function hideModal() {
  document.querySelector("#modal").classList.remove("is-visible");
}
function searchPokemon(e) {
  let t = document.querySelector("#pokemon-list");
  t.innerHTML = "";
  let n = pokemonRepository
    .getAll()
    .filter((t) => t.name.toLowerCase().includes(e.toLowerCase()));
  n.forEach((e) => {
    let n = document.createElement("a");
    n.classList.add("list-group-element");
    let o = document.createElement("button");
    o.classList.add("btn", "btn-primary"),
      (o.innerText = e.name),
      n.appendChild(o),
      t.appendChild(n),
      o.addEventListener("click", function (t) {
        showDetails(e);
      });
  });
}
window.addEventListener("keydown", (e) => {
  "Escape" === e.key && hideModal();
}),
  pokemonRepository.loadList().then(function () {
    let e = pokemonRepository.getAll();
    Promise.all(e.map(pokemonRepository.loadDetails)).then(function () {
      e.forEach(function (e) {
        pokemonRepository.addListItem(e);
      });
    });
  });
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", function () {
  let e = searchInput.value.trim();
  "" === e ? pokemonRepository.resetList() : searchPokemon(e);
});
