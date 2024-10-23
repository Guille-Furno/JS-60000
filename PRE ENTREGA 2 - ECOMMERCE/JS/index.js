const productos = [
    {
    id: 1,
    nombre: "Remera",
    imagen:
        "https://zenit.uy/30072-large_default/remera-lisa-zenit.jpg",
    precio: 1800,
    stock: 24,
    },

    {
    id: 2,
    nombre: "Buzo",
    imagen:
    "https://f.fcdn.app/imgs/58f141/www.hering.com.uy/her/167d/original/catalogo/EB42-W8REN-2/1500-1500/buzo-deportivo-adulto-unissex-verde-oscuro.jpg",
    precio: 3000,
    stock: 20,
    },

    {
    id: 3,
    nombre: "Canguro",
    imagen:
    "https://image.uniqlo.com/UQ/ST3/au/imagesgoods/444967/item/augoods_66_444967.jpg?width=494",
    precio: 2500,
    stock: 22,
    },

    {
    id: 4,
    nombre: "Pantalon",
    imagen:
    "https://f.fcdn.app/imgs/863c5a/www.bas.com.uy/bas/168f/original/catalogo/W23M3624_Grisoscuro_1/1500-1500/pantalon-cargo-clasico-gris-oscuro.jpg",
    precio: 2800,
    stock: 50,
    },

    {
    id: 5,
    nombre: "Short",
    imagen:
    "https://f.fcdn.app/imgs/c8ff4a/www.sportmarket.com.uy/smaruy/d74b/original/catalogo/MS21073DO1_459_1/2000-2000/short-new-balance-de-hombre-ms21073do1-green.jpg",
    precio: 1800,
    stock: 18,
    },

    {
    id: 6,
    nombre: "Championes",
    imagen:
    "https://lrsa-media.lojasrenner.com.br/uri/medium_739849281_001_3_059a17a939.jpg",
    precio: 4500,
    stock: 38,
    },   

    {
    id: 7,
    nombre: "Jean",
    imagen:
    "https://estilobunker.com.uy/cdn/shop/files/BUNKER-1150.jpg?v=1715462601&width=2048",
    precio: 3500,
    stock: 328,
    },

    {
    id: 8,
    nombre: "Gorro",
    imagen:
    "https://m.media-amazon.com/images/I/813Cj2vTV4L._AC_SL1500_.jpg",
    precio: 1500,
    stock: 12,
    },
];

const agregarProductos = ({ nombre, precio, imagen, stock }) => {

    const maxId = productos.reduce((max, producto) => Math.max(max, producto.id), 0);
    
    const nuevoProducto = {
        id: maxId + 1,
        nombre,
        precio,
        imagen,
        stock
    };

    productos.push(nuevoProducto);
};

const mostrarProductos = () => {
    let mensajeInformativo = "";
    for (let producto of productos) {
    mensajeInformativo += `
    
    ID : ${producto.id}
    Nombre : ${producto.nombre}
    Precio : ${producto.precio}
    Imagen : ${producto.imagen}
    Stock : ${producto.stock}\n

    `;
    }
    console.log(mensajeInformativo);
};

const solicitarDatosDelProducto = () => {
    let nombreProducto = prompt("Ingresa el nombre del producto");
    let imagen = prompt("Por favor ingresa la URL de la imagen");
    let precioDelProducto = parseFloat(
    prompt("A continuacion ingresa el precio")
    );
    let stock = parseInt(
    prompt("Por favor ingresa la cantidad de unidades disponible")
    );
    if (nombreProducto && !isNaN(precioDelProducto) && imagen && !isNaN(stock)) {
    return { nombre: nombreProducto, precio: precioDelProducto, imagen, stock };
    } else {
    alert("Por ingresa datos validos");
    }

};

const eliminarProducto = (nombre) => {
    const indice = productos.findIndex(
    (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (indice !== -1) {
    productos.splice(indice, 1);
    console.log(`Producto ${nombre} eliminado con exito`);
    mostrarProductos();
    } else {
    alert(`Producto ${nombre} no encontrado`);
    }

    mostrarProductos();
};

const cambiarStock = (nombre, nuevoStock) => {
    const indice = productos.findIndex(
        (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (indice !== -1) {
        productos[indice].stock = nuevoStock; 
        console.log(`El stock del producto ${nombre} ha sido actualizado a ${nuevoStock}`);
    } else {
        alert(`Producto ${nombre} no encontrado`);
    }

    mostrarProductos(); 
};


const main = () => {
    let opcion = "";

    while (opcion !== "6") { 
        opcion = prompt(
            "Selecciona una opción: \n1. Agregar Productos \n2. Ver Productos \n3. Eliminar producto \n4. Cambiar stock \n5. Salir"
        );

        switch (opcion) {
            case "1":
                const nuevoProducto = solicitarDatosDelProducto();
                if (nuevoProducto) {
                    agregarProductos(nuevoProducto);
                    mostrarProductos();
                }
                break;

            case "2":
                mostrarProductos();
                break;

            case "3":
                const productoAEliminar = prompt("Ingresa el nombre del producto a eliminar");
                eliminarProducto(productoAEliminar);
                break;

            case "4":
                const nombreProducto = prompt("Ingresa el nombre del producto cuyo stock deseas cambiar");
                const nuevoStock = parseInt(prompt("Ingresa la nueva cantidad de stock"));
                if (!isNaN(nuevoStock)) {
                    cambiarStock(nombreProducto, nuevoStock);
                } else {
                    alert("Por favor ingresa un número válido para el stock");
                }
                break;

            case "5":
                console.log("Saliendo...");
                break;

            default:
                alert("Opción no válida. Por favor selecciona de nuevo");
        }
    }
};

main();

