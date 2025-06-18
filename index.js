require('dotenv').config();
const rateLimiter = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require('helmet');
const mysql =require('mysql2');
const cool = require('cool-ascii-faces');
const express = require('express');
const port = process.env.PORT || 3001;
const app = express();
const fs = require('fs');


const limiter = rateLimiter.rateLimit({
    windowMs: 60*60*1000,
    max: 1,
    message: "Você excedeu 1 requisição em 24 horas."
})

const mysqlConfig = {
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    ssl: {
        ca: fs.readFileSync('./ca-certificate.crt')
    }
}

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});


// Medidas de segurança para a API.
app.use(limiter);
app.use(xss());
app.use(helmet());
//******************************** */

app.get('/data', (req, res) => {
    connection.query('SELECT * FROM user', (error, results) => {
        if (error) {
            res.status(500).send('Erro na consulta: ' + error.message);
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});



app.get('/',limiter,(req,res)=>{
    console.log('Hello, Word!');
})

app.get('/cool', limiter,(req,res)=>{
    res.send(cool());
})

app.listen(port, ()=> {
    console.log(`start listening ${port}`);
})