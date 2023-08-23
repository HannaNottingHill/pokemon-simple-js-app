document.addEventListener("DOMContentLoaded", function () {
  let e = (function () {
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
            var n, o, i, r;
            let l, a, c, s;
            (n = t),
              (o = n.name),
              (i = `Height: ${n.height}`),
              (r = n.imageUrl),
              (l = document.querySelector("#pokemonModal")),
              (a = l.querySelector(".modal-title")),
              (c = l.querySelector("#pokemonImage")),
              (s = l.querySelector("#pokemonHeight")),
              (a.innerText = o),
              (c.src = r),
              (c.alt = o),
              (s.innerText = i),
              $(l).modal("show");
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
    };
  })();
  window.addEventListener("keydown", (e) => {
    "Escape" === e.key &&
      document.querySelector("#modal").classList.remove("is-visible");
  }),
    e.loadList().then(function () {
      let t = e.getAll();
      Promise.all(t.map(e.loadDetails)).then(function () {
        t.forEach(function (t) {
          e.addListItem(t);
        });
      });
    });
});
