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

  <div class="d-flex flex-row-reverse bd-highlight">
    <div class="p-2 bd-highlight">
      <label for="">Show</label>
      <select name="" id="opcionMostrar" onchange="cambioOrden()">
        <!-- 12 -->
        <option value="12">1</option> 
        <!-- 6 -->
        <option value="6">2</option> 
        <!-- 4 -->
        <option value="4" selected>3</option>
        <!-- 3 -->
        <option value="3">4</option>
        <!-- 2 -->
        <option value="2">6</option>
      </select>
    </div>
  </div>

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
  let dividir = $('#opcionMostrar').val()
  let inicio = '<div class="col-xl-12 col-sm-12 row mt-4 mb-4" id="boxContend">'
  let contenido = ''
  let pedido = ''
  let tablaPedido = ''
  let fin = '</div>'

  for (const iterator of this.response) {
    console.log(iterator)

    for (const iterator2 of iterator.order) {
      console.log(iterator2)
      pedido +=  `
        <tr>
          <td class="sticky-cell">
            <input type="checkbox" aria-label="Checkbox for following text input">
            ${iterator2.name}
          </td>
          <td>${iterator2.additional}</td>
          <td>${iterator2.status}</td>
        </tr>
      `
    }

    tablaPedido = `
      <div class="row scroll-datatable table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="sticky-cell">Name</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            ${pedido}
          </tbody>
        </table>
      </div>
    `

    contenido += `
      <div class="col-xl-${dividir} col-sm-${dividir} p-0">
        <div class="card m-2">
          <div class="card-body">
            <h5 class="card-title">
              (${iterator.orderNo}) <br>
              ${iterator.name} <br>
              ${iterator.dateOrder} <br>
              ${iterator.status} <br> 
            </h5>
            <div class="col-sm-12 row">
              ${tablaPedido}
            </div>
            <br>
            <a href="#" class="btn btn-primary">Inciar</a>
            <a href="#" class="btn btn-primary">Entregar</a>
            <a href="#" class="btn btn-primary">Devolucion</a>
          </div>
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
  <div class="d-flex justify-content-center">
    Frank
  </div> 
</div>
`)
