let productos = [];

function agregarProducto(nombre, precio, cantidad) {
    let producto = {
        id: Date.now(),
        nombre,
        precio,
        cantidad
    };
    productos.push(producto);
    mostrarProductos();
}

function mostrarProductos() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    productos.forEach(prod => {
        lista.innerHTML += `
        <tr>
            <td>${prod.nombre}</td>
            <td>${prod.precio}</td>
            <td>${prod.cantidad}</td>
            <td>
                <button onclick="eliminarProducto(${prod.id})">Eliminar</button>
            </td>
        </tr>`;
    });
}

function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    mostrarProductos();
}


document.getElementById("formProducto").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let cantidad = document.getElementById("cantidad").value;

    agregarProducto(nombre, precio, cantidad);

    this.reset();
});