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


//precio dolar
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






// generando el form y el calculo de impuesto 
const urlCryptoya = "https://criptoya.com/api/dolar"

fetch(urlCryptoya)
.then(response => response.json())
.then(({oficial}) => {
    const dolarOficial = oficial
    console.log(dolarOficial)
})

console.log(dolarOficial)




