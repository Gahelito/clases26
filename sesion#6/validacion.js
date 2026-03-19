const estado = {
    usuarios:[]
};

const formulario = document.getElementById("formulario");

const campos ={
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    edad: document.getElementById("edad"),
    password: document.getElementById("password"),
};

formulario.addEventListener("submit", manejarSubmit);

function manejarSubmit(e){
    e.preventDefault();

    const datos = obtenerdatos();
    const errores = validarFormularios(datos);

    if(Object.keys(errores).length > 0){
        mostrarErrores(errores);
        return
    }
    if (usuarioExiste(datos.correo)){
        alert("El usuario ingresado ya existe");
        return;
    }
    guardarUsuario(datos);
    limpiarFormulario();
    renderusuarios();
}

function obtenerDatos(){
    return {
        nombre: campos.nombre.value.trim(),
        correo: campos.correo.value.trim(),
        edad: parseInt(campos.edad.value),
        password: campos.password.value.trim(),
    };

function validarFormularios(daots){
    const errores = {};

    if(datos.nombre.length < 3){
        errores.nombre = "El mínimo de carácteres es de 3"
    }
    if(!validarCorreo(datos.correo)){
        errores.correo = "Correo invalido";
    }
}
}
