let _content = $('#app')

/*Navbar*/
_content.append(`
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
`)

const url = './data.json'
const response = []

/*contend*/
fetch(url).then(response => {
  // Verificamos si la respuesta es exitosa (código de estado 200)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Convertimos la respuesta en JSON y la retornamos
  return response.json();
}).then(data => {
  // Aquí tienes acceso a los datos del archivo JSON como un objeto JavaScript
  this.response = []
  this.response = data
  llenarPedido()
}).catch(error => {
  // Manejamos cualquier error que ocurra durante el proceso
  console.error('There was a problem with the fetch operation:', error);
});

const cambioOrden = () => {
  $('#boxContend').remove()
  llenarPedido()
}

const llenarPedido = () => {
  let inicio = '<div id="boxContend">'
  let contenido = '<div class="d-flex flex-wrap">'
  let pedido = ''
  let tablaPedido = ''
  let fin = '</div>'
  let columnas = 0

  for (const iterator of this.response) {
    columnas = iterator.order.length
    pedido +=  `<div style="column-count: ${columnas};">`
    pedido +=  `<div class="text-break">`
    for (const iterator2 of iterator.order) {
      console.log(iterator2.additional)
      pedido +=  `
        <div class="alert-dark text-dark">
          Producto: ${iterator2.name} <br>
          Estado: ${iterator2.status} <br> <br>
          Aderesos: ${iterator2.additional} <br> <br>
        </div>
        <br>
      `
    }
    pedido +=  `</div></div>`

    tablaPedido = `
      ${pedido}
    `

    contenido += `
    <div class="card m-2">
      <div class="card-header">
        <div class="d-flex bd-highlight">
          <div class="p-2 w-100 bd-highlight">
            ${iterator.name} <br>
            ${iterator.dateOrder} <br>
            ${iterator.status}
          </div>
          <div class="p-2 flex-shrink-1 bd-highlight">
            ${iterator.time}
          </div>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <div class="row ml-auto">
          Order no(${iterator.orderNo})
          Cantidad (${iterator.order.length})
          </div>
        </h5>
        <div class="col-sm-12 row">
          ${tablaPedido}
        </div>
        <a href="#" class="btn btn-primary">Inciar</a>
        <a href="#" class="btn btn-primary">Entregar</a>
        <a href="#" class="btn btn-primary">Devolucion</a>
      </div>
    </div>
    `
    pedido = ''
  }

  _content.append(
    inicio + contenido + fin
  )
}

/*Footer*/
_content.append(`
<div class="fixed-bottom">
  <div class="d-flex align-content-around flex-wrap">
    Frank
  </div> 
</div>
`)
