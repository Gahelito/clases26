  const paquetes = [
    { id: 1, nombre: "Básico",    velocidad: "50 Mbps",  precio: "$15.00/mes", descripcion: "Ideal para uso básico" },
    { id: 2, nombre: "Estándar",  velocidad: "100 Mbps",  precio: "$25.00/mes", descripcion: "Para el hogar" },
    { id: 3, nombre: "Premium",   velocidad: "200 Mbps",  precio: "$40.00/mes", descripcion: "Para trabajo y streaming" }
  ];


  function cargarPaquetes() {
    console.log("Cargando paquetes de servicio...", paquetes);

    const contenedor = document.getElementById("contenedorPaquetes");
    contenedor.innerHTML = "";

    paquetes.forEach(paquete => {
      const card = document.createElement("div");
      card.classList.add("paquete-card");
      card.innerHTML = `
        <h3>${paquete.nombre}</h3>
        <p>${paquete.descripcion}</p>
        <p><strong>${paquete.velocidad}</strong></p>
        <p class="precio">${paquete.precio}</p>
      `;
      card.onclick = () => seleccionarPaquete(paquete, card);
      contenedor.appendChild(card);
    });
  }


  function seleccionarPaquete(paquete, elemento) {
    console.log("Paquete seleccionado:", paquete);


    document.querySelectorAll(".paquete-card").forEach(c => c.classList.remove("seleccionado"));
    elemento.classList.add("seleccionado");


    document.getElementById("paqueteSeleccionado").value = JSON.stringify(paquete);
  }


  function obtenerDatos() {
    console.log("Obteniendo datos del formulario...");

    const datos = {
      nombre:       document.getElementById("nombre").value.trim(),
      dui:          document.getElementById("dui").value.trim(),
      telefono:     document.getElementById("telefono").value.trim(),
      email:        document.getElementById("email").value.trim(),
      departamento: document.getElementById("departamento").value,
      municipio:    document.getElementById("municipio").value.trim(),
      direccion:    document.getElementById("direccion").value.trim(),
      paquete:      document.getElementById("paqueteSeleccionado").value
    };

    console.log("Datos obtenidos:", datos);
    return datos;
  }

  
  function validarDatos(datos) {
    console.log("Validando datos...", datos);

    if (!datos.nombre || !datos.dui || !datos.telefono || !datos.email) {
      alert("⚠️ Por favor complete todos los datos personales.");
      return false;
    }
    if (!datos.departamento || !datos.municipio || !datos.direccion) {
      alert("⚠️ Por favor complete todos los datos de localización.");
      return false;
    }
    if (!datos.paquete) {
      alert("⚠️ Por favor seleccione un paquete de servicio.");
      return false;
    }
    return true;
  }


  function procesarContratacion() {
    console.log("Iniciando proceso de contratación...");

    const datos = obtenerDatos();
    if (!validarDatos(datos)) return;

    const paquete = JSON.parse(datos.paquete);
    mostrarResumen(datos, paquete);
  }


  function mostrarResumen(datos, paquete) {
    console.log("Mostrando resumen de contratación...", { datos, paquete });

    const resumenDiv = document.getElementById("resumen");
    const contenido  = document.getElementById("contenidoResumen");

    contenido.innerHTML = `
      <p><strong>⓿ Nombre:</strong> ${datos.nombre}</p>
      <p><strong>⓿ DUI:</strong> ${datos.dui}</p>
      <p><strong>⓿ Teléfono:</strong> ${datos.telefono}</p>
      <p><strong>⓿ Email:</strong> ${datos.email}</p>
      <hr style="margin:10px 0;">
      <p><strong>⓿ Departamento:</strong> ${datos.departamento}</p>
      <p><strong>⓿ Municipio:</strong> ${datos.municipio}</p>
      <p><strong>⓿ Dirección:</strong> ${datos.direccion}</p>
      <hr style="margin:10px 0;">
      <p><strong>⓿ Paquete:</strong> ${paquete.nombre} - ${paquete.velocidad}</p>
      <p><strong>⓿ Precio:</strong> ${paquete.precio}</p>
      <p>
        ¡Su contratación fue realizada con éxito!
      </p>
    `;

    resumenDiv.style.display = "block";
    resumenDiv.scrollIntoView({ behavior: "smooth" });
  }


  cargarPaquetes();
