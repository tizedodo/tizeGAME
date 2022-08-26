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
    console.log(precioDolar + ' sa e pri dola an')

    //map kontrole form nan andan async lan

    const formImpuestos = document.getElementById("formImpuestos")
    //const precioProductoEndolar = document.getElementById("precioProductoEndolar")

    formImpuestos.addEventListener('submit', (event) => {
    event.preventDefault()
    const precioProduct = document.getElementById("precioProductoEndolar").value
    console.log(precioProduct*2)
    
    const impuestopaisYretenciones = 0.75 //se usa multiplicando con el precio ya en dolar y se le suma

    let precioPoductEnpesosSinImpo = precioProduct * precioDolar
    let montoImpuestopaisYret      = precioPoductEnpesosSinImpo *impuestopaisYretenciones
    
    let precioConImpo = precioPoductEnpesosSinImpo+montoImpuestopaisYret
    



    const mostrarData = () => {
        monstrarImpuesto.innerHTML = ''
        monstrarImpuesto.innerHTML = `
        <h2>Precio del producto sin impuesto en dolar us: $${precioProduct}</h2>
        <h2>Precio final con impuesto agregado: $ ${precioConImpo}</h2>
        
        <div>
        <button type="submit" class="btn_jason" id="resgritarJuego"> Guardar el producto </button>
        <button type="submit" class="btn_jason" id="resgritarJuego"> Monstrar los productos guardado </button>


        </div>
        `
    }
    mostrarData()




    formImpuestos.reset()
})


}

loadData()







