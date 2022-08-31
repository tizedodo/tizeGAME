// Ejecutar funcion en el evento click
document.getElementById("btn_open").addEventListener("click", open_close_menu)

// declaramos variables

var side_menu = document.getElementById("menu__side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");


// evento para mostrar y ocultar el menu
    function open_close_menu(){
        body.classList.toggle("body_move");
        menu__side.classList.toggle("menu__side_move")
    }



// si el ancho de la pagina es menor a 760px, ocultara el menu al recargar la pagina

if(window.innerWidth < 760){
    
    body.classList.add("body_move")
    side_menu.classList.add("menu__side_move")
}


//haciendo el menu responsive(adaptable)

window.addEventListener("resize", function(){

    if (window.innerWidth > 760){

        body.classList.remove("body_move")
        side_menu.classList.remove("menu__side_move")
    }

    if (window.innerWidth < 760){

        body.classList.add("body_move")
        side_menu.classList.add("menu__side_move")
    }
})


// aca termina todo lo que tiene que ver con el menu


//precio dolar LATERAL DERECHA
const divprecio = document.getElementById("divprecio")
const url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';


function consultarDolar(){
    fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    const mostrarData = (data) => {
        divprecio.innerHTML = ''
        divprecio.innerHTML = `
        <h2>DOLAR Precio</h2>

        <div class="container_cambio">

        <div >
            <p class="container_tag">Oficial
                <p>compra 
                    <h4 class="precio_dolar">$${data[0].casa.compra}</h4> 
                </p>
                <p>venta
                    <h4 class="precio_dolar">$${data[0].casa.venta} </h4>
                </p>
            </p>
        </div>

        <div>
        <p class="container_tag">Blue
            <p>Compra
                    <h4 class="precio_dolar">$${data[1].casa.compra}</h4> 
            </p> 
                <p>Venta 
                    <h4 class="precio_dolar">$${data[1].casa.venta} </h4> 
                </p>
            </p>
        </div>


    </div>

    `
    }
}

consultarDolar()


setInterval(() =>{
    consultarDolar()
},300000)



// calculando impuestos del productos

const monstrarImpuesto = document.getElementById("monstrarImpuesto")
async function loadData(){
    const response = await fetch('https://criptoya.com/api/dolar')
    const data = await response.json()
    let precioDolar = data.oficial
    // const c = dataBlue 

    //map kontrole form nan andan async lan

    const formImpuestos = document.getElementById("formImpuestos")
    //const precioProductoEndolar = document.getElementById("precioProductoEndolar")

    formImpuestos.addEventListener('submit', (event) => {
    event.preventDefault()
    const precioProduct = document.getElementById("precioProductoEndolar").value
    
    const impuestopaisYretenciones = 0.75 //se usa multiplicando con el precio ya en dolar y se le suma

    let precioPoductEnpesosSinImpo = precioProduct * precioDolar
    let montoImpuestopaisYret      = precioPoductEnpesosSinImpo *impuestopaisYretenciones
    
    const precioConImpo = precioPoductEnpesosSinImpo+montoImpuestopaisYret
    



    const mostrarData = () => {
        monstrarImpuesto.innerHTML = ''
        monstrarImpuesto.innerHTML = `
        <h2>Precio del producto sin impuesto en dolar us: $${precioProduct}</h2>
        <h2>Precio final con impuesto agregado: $ ${precioConImpo}</h2>
        
        <div>
        <button type="submit" id="showDivInfo"  onclick="showDivFOrm()" class="btn_jason"> Guardar el producto </button>
        </div>
        `
    }
    mostrarData()
    formImpuestos.reset()
})
// manejando el form para info del producto y guadar los datos en el jason


class Producto{
    constructor(nombre,img,precioP){
        this.nombre = nombre
        this.img = img
        this.precioP = precioP
    }
}

let productos = []

if(localStorage.getItem('productos')) {
    productos = JSON.parse(localStorage.getItem('productos'))
} else {
    localStorage.setItem('productos', JSON.stringify(productos))
}

const formInfo_producto = document.getElementById("formInfo_producto")
const divProductos = document.getElementById("divProductos")
const botonProductos = document.getElementById("monstrarProductos")

formInfo_producto.addEventListener('submit',(e) => {
    e.preventDefault()
    let dataForm = new FormData(e.target)
    let producto = new Producto(dataForm.get('nombreProducto'), dataForm.get('imgProducto'), dataForm.get('precioProducto'))
    productos.push(producto)
    localStorage.setItem('productos',JSON.stringify(productos))
    formInfo_producto.reset()
})

//aca monstrare los productos que guardo el usuario

botonProductos.addEventListener('click', () =>{

    let arrayStorage = JSON.parse(localStorage.getItem('productos'))
    divProductos.innerHTML = ""

    arrayStorage.forEach((producto, indice) => {
        
        divProductos.innerHTML += `
        <div id="producto${indice}" class="divProductos_card">
            <img src="${producto.img}" class="divProductos_img">
            <h1 class="divProductos_title">${producto.nombre}</h1>
            <p>Precio: $${producto.precioP} </p>
            <button class="divProductos_btn">Eliminar Producto</button>
        </div>
        
        `
    });


    arrayStorage.forEach((producto, indice) => {
        let botonDelete = document.getElementById(`producto${indice}`).lastElementChild

        botonDelete.addEventListener('click', () => {
            document.getElementById(`producto${indice}`).remove()
            productos.splice(indice,1)
            localStorage.setItem('productos', JSON.stringify(productos))
        
        })
    })

    Swal.fire({
        title: 'Estos son los productos que tenes guardado!',
        text: 'Gracias por usar tizeGame!',
        footer: '<a class="link_alert" href="">   >Si te gustó y querés apoyar el proyecto podés invitarme un cafecito por acá. ¡Muchas gracias!</a>'
    })

})
}

loadData()

function showDivFOrm() {
    var element = document.getElementById("container_formProducInfo");
    element.classList.remove("desactivar_divInfoForm");
}

const guargararProducto = document.getElementById("guargararProducto")
const nombreDelproDucto = document.getElementById('nombreProducto')


guargararProducto.addEventListener('click', () => {

    if (nombreDelproDucto.value.length == 0){
        
        Swal.fire({
            icon: 'error',
            title: 'Porfavor completa todos los campos con datos valido!',
            text: 'Pinche pendejo!',
        })

    }else{
        Swal.fire({
            icon: 'success',
            title: 'El juego fue registrardo en su local estorage!',
            footer: '<a class="link_alert" href="">Si te gustó y querés apoyar el proyecto podés invitarme un cafecito por acá. ¡Muchas gracias!</a>'
    })
    }
})








