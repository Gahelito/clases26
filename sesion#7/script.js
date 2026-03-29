document.addEventListener("DOMContentLoaded", () => { // ← Corregido: DOMContentLoaded
    // Obtener usuarios del localStorage
    const obtenerUsuarios = () => JSON.parse(localStorage.getItem("usuarios")) || [];
    
    // Guardar usuarios en localStorage
    const guardarUsuarios = (usuarios) => localStorage.setItem("usuarios", JSON.stringify(usuarios));

    const setSesion = (email) => localStorage.setItem("usuario-email", email);
    const getSesion = () => localStorage.getItem("usuario-email");
    const cerrarSesion = () => {
        localStorage.removeItem("usuario-email");
        window.location.href = "index.html";
    }

    const path = window.location.pathname;
    
    // Login - index.html
    if (path.includes("index.html") || path === "/") {
        const loginForm = document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value.trim();
                const error = document.getElementById("error-message");
                
                // Validación básica
                if (!email || !password) {
                    if (error) error.innerHTML = "Por favor completa todos los campos";
                    return;
                }

                // Buscar usuario
                const usuario = obtenerUsuarios().find(u => u.email === email && u.password === password);
                
                if (usuario) {
                    setSesion(email);
                    window.location.href = "bienvenida.html";
                } else {
                    if (error) error.innerHTML = "Correo o contraseña incorrectos";
                }
            });
        }
    }
    
    // Registro - registro.html
    if (path.includes("registro.html")) {
        // cspell:disable-next-line
        const registroForm = document.getElementById("registroForm");
        // cspell:disable-next-line
        if (registroForm) {
            // cspell:disable-next-line
            registroForm.addEventListener("submit", (e) => {
                e.preventDefault();
                // cspell:disable-next-line
                const nombre = document.getElementById("nombre").value.trim();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value.trim();
                 
                // Validación de campos obligatorios
                if (!nombre || !email || !password) {
                    return alert("Todos los campos son obligatorios");
                }

                // Validación de email existente
                let usuarios = obtenerUsuarios();
                if (usuarios.some(u => u.email === email)) {
                    return alert("El correo ya está registrado");
                }

                // Agregar nuevo usuario
                usuarios.push({ nombre, email, password });
                guardarUsuarios(usuarios);
                setSesion(email);

                alert("Registro exitoso");
                registroForm.reset();
                window.location.href = "index.html";
            });
        }
    }
    
    // Bienvenida - bienvenida.html
    if (path.includes("bienvenida.html")) {
        const email = getSesion();
        if (!email) {
            return window.location.href = "index.html";
        }
        
        const usuario = obtenerUsuarios().find(u => u.email === email);
        if (usuario) {
            const nombreElement = document.getElementById("nombre-usuario");
            if (nombreElement) {
                nombreElement.textContent = usuario.nombre;
            }
        }
        
        const logoutBtn = document.getElementById("logout");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", cerrarSesion);
        }
    }
});