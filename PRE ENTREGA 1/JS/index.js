function mostrarServicios() {
    let catalogo = "Catálogo de servicios: \n";
    catalogo += "1. Diseño Web - USD 100 \n";
    catalogo += "2. Desarrollo Sitio - USD 300 \n";
    catalogo += "3. Formulario Web - USD 50 \n";
    catalogo += "4. Diseño Responsive - USD 100 \n";
    catalogo += "5. Posicionamiento SEO Básico - USD 45 \n";
    catalogo += "Con la compra de todos los servicios, 15% de descuento\n";
    return catalogo;
}

function comprarServicio() {
    let total = 0;
    let serviciosComprados = new Set();
    let seguirComprando = true;

    while (seguirComprando) {
        let catalogo = mostrarServicios();
        let eleccion = prompt(
            catalogo +
            "\n¿Qué servicio quieres comprar?\nIngrese el número o escriba 'salir' para finalizar."
        );

        // Verificamos si el usuario ingresó un dato
        if (eleccion === null || eleccion === "") {
            alert("No has ingresado un dato válido.");
            continue;
        }

        // Verificamos si el usuario ingresó 'salir'
        if (eleccion.toLowerCase() === "salir") {
            break;
        }

        eleccion = parseInt(eleccion);

        // Verificamos que el dato sea un número válido
        if (isNaN(eleccion) || eleccion < 1 || eleccion > 5) {
            alert("Servicio no válido, selecciona nuevamente.");
            continue;
        }

        // Agregamos el servicio al total y al conjunto de servicios comprados
        if (eleccion === 1) {
            total += 100;
            serviciosComprados.add(eleccion);
            alert("Has agregado Diseño Web.");
        } else if (eleccion === 2) {
            total += 300;
            serviciosComprados.add(eleccion);
            alert("Has agregado Desarrollo Sitio.");
        } else if (eleccion === 3) {
            total += 50;
            serviciosComprados.add(eleccion);
            alert("Has agregado Formulario Web.");
        } else if (eleccion === 4) {
            total += 100;
            serviciosComprados.add(eleccion);
            alert("Has agregado Diseño Responsive.");
        } else if (eleccion === 5) {
            total += 45;
            serviciosComprados.add(eleccion);
            alert("Has agregado Posicionamiento SEO Básico.");
        }

        let resupuesta = prompt("quieres seguir comprando? (si/no)");

        if (resupuesta === "si") {
        seguirComprando = true;
        } else {
        seguirComprando = false;
        }
    }

    // Aplicar descuento si se compraron todos los servicios
    if (serviciosComprados.size === 5) {
        total *= 0.85; // 15% de descuento
        alert("Has comprado todos los servicios. Se aplicó un 15% de descuento.");
    }

    // Mostrar el total final
    alert("El total de tu compra es: USD " + total.toFixed(2));
}

// Llamar a la función para iniciar la compra
comprarServicio();
