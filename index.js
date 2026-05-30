var express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./BD/postgre');

var app = express();
var port = process.env.PORT || 3525;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));
app.use('/imgs', express.static(__dirname + '/imgs'));

app.get('/', function (req, res) {
    res.status(200).sendFile(__dirname + '/index.html');
});

app.post('/api/registro', async function (req, res) {
    const { nombre, telefono, correo, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO usuarios (nombre, telefono, correo, password) VALUES ($1, $2, $3, $4)',
            [nombre, telefono, correo, hashedPassword]
        );
        res.send('Registro exitoso. <a href="/">Volver para Iniciar Sesión</a>');
    } catch (err) {
        console.error('Error en registro:', err);
        if (err.code === '23505') {
            res.status(400).send('El correo ya está registrado. <a href="/">Volver</a>');
        } else {
            res.status(500).send('Error al registrar usuario. <a href="/">Volver</a>');
        }
    }
});

app.post('/api/login', async function (req, res) {
    const { correo, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (result.rows.length === 0) {
            return res.status(401).send('Usuario no encontrado. <a href="/">Volver</a>');
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.status(401).send('Contraseña incorrecta. <a href="/">Volver</a>');
        }
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).send('Error en el servidor. <a href="/">Volver</a>');
    }
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('[GET] http://localhost:3525/');
});