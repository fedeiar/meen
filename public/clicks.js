
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
            lista = lista + "<p>" + peli.title + "</p>";
        })
        const divRes = document.getElementById("resultados");
        divRes.innerHTML = lista;
        return;
    } )
    .catch(function(error) {
      console.log(error);
    });

   

});