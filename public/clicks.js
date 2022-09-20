
const button = document.getElementById('buttonBuscar');
const buttonBuscarEspecifico = document.getElementById('buttonBuscarEspecifico');
const buttonQueBusca = document.getElementById('buttonQueBusca');
const buttonQuePostea = document.getElementById('buttonQuePostea');

const divResultados = document.getElementById("resultados");

button.addEventListener('click', function(e) {
    // realizar la busqueda y generar la lista 
    const term = document.getElementById('input_field').value;
    fetch('/peliculas/'+term, {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then((data) => {
        let lista = "";
        data.forEach((peli)=>
        {
            rating_IMDB = peli.imdb != undefined ? peli.imdb.rating : "unavailable";
            rating_tomatoes = peli.tomatoes != undefined && peli.tomatoes.viewer != undefined ? peli.tomatoes.viewer.rating : "unavailable";
            rating_metaCritic = peli.metacritic != undefined ? peli.metacritic : "unavailable";
            poster = peli.poster != undefined ? "<img src="+peli.poster+"></img>" : "<p> Poster: unavailable <p>"

            lista = lista + "<p> Title: " + peli.title + "</p>" +
            "<p> Year: " + peli.year + "</p>" + 
            "<p> Rating IMDB: " + rating_IMDB + "</p>" +
            "<p> Rating Tomatoes: " + rating_tomatoes + "</p>" +
            "<p> Rating MetaCritic: " + rating_metaCritic + "</p>" +
            poster +
            "<hr></hr>";
        })
        divResultados.innerHTML = lista;
        return;
    })
    .catch(function(error) {
      console.log(error);
    });

});

buttonBuscarEspecifico.addEventListener('click', function(e) {
    fetch('/peliculas_hardcodeadas/', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then((data) => {
        let lista = "";
        data.forEach((peli)=>
        {
            rating_IMDB = peli.imdb != undefined ? peli.imdb.rating : "unavailable";
            rating_tomatoes = peli.tomatoes != undefined && peli.tomatoes.viewer != undefined ? peli.tomatoes.viewer.rating : "unavailable";
            rating_metaCritic = peli.metacritic != undefined ? peli.metacritic : "unavailable";
            poster = peli.poster != undefined ? "<img src="+peli.poster+"></img>" : "<p> Poster: unavailable <p>"

            lista = lista + "<p> Title: " + peli.title + "</p>" +
            "<p> Year: " + peli.year + "</p>" + 
            "<p> Rating IMDB: " + rating_IMDB + "</p>" +
            "<p> Rating Tomatoes: " + rating_tomatoes + "</p>" +
            "<p> Rating MetaCritic: " + rating_metaCritic + "</p>" +
            poster +
            "<hr></hr>";
        })
        divResultados.innerHTML = lista;
        return;
    })
    .catch(function(error) {
      console.log(error);
    });

    return;
});


buttonQueBusca.addEventListener('click', function(e) {
    divResultados.innerHTML = '<p> Busca todas las películas en las que haya participado Jim Carrey o Adam Sandler, entre los años 1995 y 2000, y que la trama completa incluya la palabra "father" </p>';
    return;
});


buttonQuePostea.addEventListener('click', function(e) {
    fetch('/peliculas', {
        method: 'POST',
        body: null
    })
    .then(function(response) {
        if(response.ok) {
            divResultados.innerHTML = "<p> Película insertada correctamente </p>"
        }else{
            throw new Error('Request failed.');
        }
    })

});