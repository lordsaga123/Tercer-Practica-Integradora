/*const socket = io(); 

socket.on("productos", (data) => {
    console.log(data);
    renderProductos(data);
})

//Función para renderizar nuestros productos: 

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";
    
    productos.docs.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = ` 
                        <p>Nombre: ${item.title} </p>
                        <p>Precio:$ ${item.price} </p>
                        <p>ID: ${item._id} </p>
                        <p>Stock: ${item.stock} </p>
                        <button> Eliminar </button>
                        `;
                        

        contenedorProductos.appendChild(card);
        //Agregamos el evento al boton de eliminar: 
        card.querySelector("button").addEventListener("click", ()=> {
            eliminarProducto(item._id);
        })
    })
}


const eliminarProducto = (id) =>  {
    socket.emit("eliminarProducto", id);
}

//Agregamos productos del formulario: 

document.getElementById("btnEnviar").addEventListener("click", () => {
    console.log("Se recive la orden de enviar productos en realtime btn enviar")
    agregarProducto();
    Swal.fire({
        title: "Identificate", 
        input: "text",
        text: "Ingresa un usuario para identificarte en el chat", 
        inputValidator: (value) => {
            return !value && "Necesitas escribir un nombre para continuar"
        }, 
        allowOutsideClick: false,
    }).then( result => {
        user = result.value;
    })
    
})


const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    };

    socket.emit("agregarProducto", producto);
}*/
const socket = io(); 

socket.on("productos", (data) => {
    console.log(data);
    renderProductos(data);
})

// Función para renderizar nuestros productos
const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";
    
    productos.docs.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = ` 
            <p>Nombre: ${item.title} </p>
            <p>Precio:$ ${item.price} </p>
            <p>ID: ${item._id} </p>
            <p>Stock: ${item.stock} </p>
            <button> Eliminar </button>
        `;

        contenedorProductos.appendChild(card);
        
        // Agregamos el evento al botón de eliminar
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item._id);
        });
    });
}

// Función para eliminar un producto
const eliminarProducto = (id) =>  {
    socket.emit("eliminarProducto", id);
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto eliminado exitosamente",
        showConfirmButton: false,
        timer: 1500
    });
}

// Función para agregar un producto
const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    };
    
    socket.emit("agregarProducto", producto);
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado exitosamente",
        showConfirmButton: false,
        timer: 2500
    });
}

// Evento al hacer clic en el botón "Enviar"
document.getElementById("btnEnviar").addEventListener("click", () => {
    console.log("Se recibe la orden de enviar productos en tiempo real (botón enviar)")
    agregarProducto();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado exitosamente",
        showConfirmButton: false,
        timer: 2500
    }).then(result => {
        user = result.value;
    })
})

