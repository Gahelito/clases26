//arreglo principal
let biblioteca = [];

function addLibro(titulo, autor, genero) {
    return{
        titulo: titulo,
        autor: autor,
        genero: genero,
    };

}

function addLibro(){
    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let genero = document.getElementById("genero").value;

    if (titulo ==='' || autor ===''){
        alert('Llena todos los campos de manera correcta');
        return;
    }

    let libro = addLibro(titulo, autor, genero);
    biblioteca.push(libro);

    document.getElementById("titulo").value ='';
    document.getElementById("autor").value ='';

    alert ('libro registrado exitosamente' + libro.titulo);
    mostrarTodos();
}

function mostrarTodos(){
    let listaLibros = document.getElementById("listaLibros");
    listaLibros.innerHTML == '';

    if (biblioteca.length === 0){
        listaLibros.innerHTML =  'no existen libros en la biblioteca';
        return;
    }

    biblioteca.forEach(function(libro, index){
        let lib = document.createElement('div');
        lib.className = 'libro-item';
        lib.innerHTML = `libro ${index + 1}: ${libro.titulo} de ${libro.autor}(${libro.genero})`;
        listaLibros.appendChild(lib);
    });
}

function eliminarlibros(){
    if (biblioteca.length > 0){
        let eliminarlibro = biblioteca.pop();
        alert('El libro eliminado es: ' + eliminarlibro.titulo);
        mostrarTodos();

    }else {
        alert("no hay libros que eliminar");
    }
}

function filtrarPorGenero(){
    let genero = prompt('introduce un genero');
    if (!gwnweo) return;

    let listaFiltrado = Document.getElementById("listaLibros");
    listaFiltrado.innerHTML = '';

    let librosFiltrados = biblioteca.filter(function(libro){
        return libro.genero.toLowerCase() === genero.toLowerCase();
    });

    if (librosFiltrados.length === 0) {
        listaFiltrado.innerHTML = 'no existen libros de ese genero: ' + genero;
        return;
    }
    librosFiltrados.forEach(function(libro, index){
        let lib = document.createElement("div");
        lib.className = "libro-item";
        lib.innerHTML = `libro ${index + 1}: ${libro.titulo} de ${libro.autor}(${libro.genero})`;
        listaFiltrado.appendChild(libro);
    });
}

function resumen(){
    let genero = new Set(biblioteca.map(function(libro){
        return libro.genero;
    }));

    let resument = 'Resumen';
    genero.forEach(function(genero){
        let cantidad = biblioteca.filter(function(libro){
            return libro.genero === genero;
    }); length;
    resumen += `\n${genero}: ${cantidad} libro(s)`;
    });
    alert(resumen);
}