
const button = document.getElementById('buttonBuscar');
const buttonBuscarEspecifico = document.getElementById('buttonBuscarEspecifico');
const buttonQueBusca = document.getElementById('buttonQueBusca');

const divResultados = document.getElementById("resultados");

button.addEventListener('click', function(e) {
    // realizar la busqueda y generar la lista 
    const term = document.getElementById('input_field').value;
    //console.log(title)
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

            lista = lista + "<p> Title: " + peli.title + "</p>" +
            "<p> Year: " + peli.year + "</p>" + 
            "<p> Rating IMDB: " + rating_IMDB + "</p>" +
            "<p> Rating Tomatoes: " + rating_tomatoes + "</p>" +
            "<img src="+peli.poster+"></img>" +
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

            lista = lista + "<p> Title: " + peli.title + "</p>" +
            "<p> Year: " + peli.year + "</p>" + 
            "<p> Rating IMDB: " + rating_IMDB + "</p>" +
            "<p> Rating Tomatoes: " + rating_tomatoes + "</p>" +
            "<img src="+peli.poster+"></img>" +
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
    divResultados.innerHTML = "<p> Buscar especifico busca... </p>";
    return;
});