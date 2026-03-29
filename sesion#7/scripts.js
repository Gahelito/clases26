document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registerForm');
            const tablaBody = document.getElementById('tablaBody');
            const btnSubmit = document.getElementById('btnSubmit');

            
            function mostrarTabla() {
                const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                tablaBody.innerHTML = '';
                
                usuarios.forEach((usuario, index) => {
                    const fila = `
                        <tr>
                            <td class="border border-gray-300 p-3">${usuario.nombre}</td>
                            <td class="border border-gray-300 p-3">${usuario.email}</td>
                            <td class="border border-gray-300 p-3">${usuario.descripcion}</td>
                            <td class="border border-gray-300 p-3">
                                <button onclick="editar(${index})" class="bg-yellow-500 text-white px-3 py-1 rounded text-sm mr-2">Editar</button>
                                <button onclick="borrar(${index})" class="bg-red-500 text-white px-3 py-1 rounded text-sm">Borrar</button>
                            </td>
                        </tr>
                    `;
                    tablaBody.innerHTML += fila;
                });
            }

            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nombre = document.getElementById('nombre').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const descripcion = document.getElementById('descripcion').value || 'Sin descripción';

                if (!nombre || !email || !password) {
                    alert('Llena todos los campos');
                    return;
                }

                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                
                
                if (usuarios.some(u => u.email === email)) {
                    alert('Email ya registrado');
                    return;
                }

                usuarios.push({nombre, email, password, descripcion});
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                
                form.reset();
                btnSubmit.textContent = '¡Guardado!';
                setTimeout(() => btnSubmit.textContent = 'Registrarse', 1500);
                
                mostrarTabla();
            });

            
            window.editar = function(index) {
                const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                const usuario = usuarios[index];
                
                document.getElementById('nombre').value = usuario.nombre;
                document.getElementById('email').value = usuario.email;
                document.getElementById('password').value = usuario.password;
                document.getElementById('descripcion').value = usuario.descripcion;
                
                btnSubmit.textContent = 'Actualizar';
                btnSubmit.onclick = function(e) {
                    e.preventDefault();
                    usuarios[index] = {
                        nombre: document.getElementById('nombre').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        descripcion: document.getElementById('descripcion').value || 'Sin descripción'
                    };
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    form.reset();
                    btnSubmit.textContent = 'Registrarse';
                    btnSubmit.onclick = null;
                    mostrarTabla();
                };
            };

            
            window.borrar = function(index) {
                if (confirm('¿Borrar usuario?')) {
                    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                    usuarios.splice(index, 1);
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    mostrarTabla();
                }
            };

            
            document.getElementById('logout').onclick = function() {
                localStorage.removeItem('usuario-email');
                window.location.href = 'index.html';
            };

            
            mostrarTabla();
        });
