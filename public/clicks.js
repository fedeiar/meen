
const button = document.getElementById('buttonBuscar');

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
        const divRes = document.getElementById("resultados");
        divRes.innerHTML = lista;
        return;
    } )
    .catch(function(error) {
      console.log(error);
    });

   

});