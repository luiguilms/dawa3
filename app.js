const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Ruta de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta de matriculas
app.post('/matriculas', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Lógica para verificar el inicio de sesión y redireccionar a la vista de matriculas
    // Aquí puedes implementar la lógica de autenticación con la base de datos o cualquier otro método
    // Si la autenticación es exitosa, redirecciona a la vista de matriculas
    if (usuario === 'luigui' && contrasena === '123456') {
        res.render('matriculas');
    } else {
        // Si la autenticación falla, puedes renderizar una vista de error o redireccionar a otra página
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});

// Ruta de confirmacion de matriculas
app.post('/confirmacion', (req, res) => {
    const curso = req.body.curso;
    const medioPago = req.body.medioPago;
    let modulos = req.body.modulo;
    // Calcula el costo total y aplica el descuento si es necesario
    if (!Array.isArray(modulos)) {
        modulos = [modulos];
    }
    let costoTotal = 0;
    for (let i = 0; i < modulos.length; i++) {
        if (curso === 'Java') {
            costoTotal += 1200;
        } else if (curso === 'PHP') {
            costoTotal += 800;
        } else if (curso === '.NET') {
            costoTotal += 1500;
        }
    }

    if (medioPago === 'Pago en efectivo') {
        const descuento = costoTotal * 0.10;
        costoTotal -= descuento;
    }
    
    

    // Lógica para procesar los datos y mostrar la vista de confirmación
    res.render('confirmacion', { curso, medioPago,modulos, costoTotal  });
});

// Puerto en el que el servidor escucha las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
