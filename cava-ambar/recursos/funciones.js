window.addEventListener('load', iniciar);

function iniciar() {
    iniciarMenu();
    iniciarValidacion();
    iniciarBuscador();
}

function iniciarMenu() {
    var boton = document.querySelector('.menu-boton');
    var nav = document.querySelector('header nav');

    if (!boton || !nav) {
        return;
    }

    boton.addEventListener('click', function () {
        nav.classList.toggle('activo');

        var abierto = nav.classList.contains('activo');
        boton.setAttribute('aria-expanded', abierto);
    });

    var links = nav.querySelectorAll('a');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function () {
            nav.classList.remove('activo');
            boton.setAttribute('aria-expanded', 'false');
        });
    }
}

function iniciarValidacion() {
    var formulario = document.querySelector('main form');

    if (!formulario) {
        return;
    }

    var campos = formulario.querySelectorAll('input, select, textarea');

    for (var i = 0; i < campos.length; i++) {
        campos[i].addEventListener('input', revisarCampo);
        campos[i].addEventListener('change', revisarCampo);
    }

    formulario.addEventListener('submit', function (evento) {
        for (var i = 0; i < campos.length; i++) {
            marcarCampo(campos[i]);
        }

        if (!formulario.checkValidity()) {
            evento.preventDefault();
        }
    });
}

function revisarCampo(evento) {
    marcarCampo(evento.target);
}

function marcarCampo(campo) {
    var vacio = campo.type === 'checkbox' ? !campo.checked : campo.value.trim() === '';

    if (!campo.required && vacio) {
        campo.classList.remove('campo-valido', 'campo-invalido');
        return;
    }

    if (campo.checkValidity()) {
        campo.classList.remove('campo-invalido');
        campo.classList.add('campo-valido');
    } else {
        campo.classList.remove('campo-valido');
        campo.classList.add('campo-invalido');
    }
}

function iniciarBuscador() {
    var formulario = document.querySelector('.buscador');
    var campo = document.getElementById('buscar-producto');
    var productos = document.querySelectorAll('.producto');

    if (!campo || productos.length === 0) {
        return;
    }

    if (formulario) {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();
        });
    }

    campo.addEventListener('input', function () {
        var texto = campo.value.toLowerCase().trim();

        for (var i = 0; i < productos.length; i++) {
            var producto = productos[i];
            var titulo = producto.querySelector('h3, h4');
            var descripcion = producto.querySelector('p');
            var contenido = titulo.textContent.toLowerCase() + ' ' + descripcion.textContent.toLowerCase();

            if (contenido.indexOf(texto) !== -1) {
                producto.classList.remove('oculto');
            } else {
                producto.classList.add('oculto');
            }
        }
    });
}
