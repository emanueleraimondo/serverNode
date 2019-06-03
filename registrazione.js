var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(cookieParser()); //cookie

const cors = require('cors');

//var cookieParser = require('cookie-parser');

app.use(cors());

//var MongoClient = require('mongodb').MongoClient;
//var Client = require('node-rest-client').Client;
//var client = new Client();


var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "www.db4free.net",
    password: "Suprema2000",
    database: "raimondosql",
    user: "emarai00"
    });


app.post('/registrazione', function(req, res) {

    var nome = req.query.nome;
    var cognome = req.query.cognome;
    var username = req.query.username;
    var email = req.query.email;
    var data = req.query.data;
    var pass = req.query.password;

    var stat; //no

  console.log("ciao");

    conn.connect(function(err) {
        if (err) throw err;
        conn.query('INSERT INTO registrazione(nome, cognome, email, username, psw, dataN) VALUES("' + nome + '","' + cognome + '","' + email + '","' + username + '","' + pass + '","' + data + '")', function(err2, result, fields) {
            if (err2) throw err2;
            console.log(result);
            res.send(result);
            alert("registrazione eseguita");
           console.log("ciao3");
        });
    });
})


app.post('/login', function(req, res) {

    var username = req.query.username;
    var pass = req.query.password;

    var stat; //no

    conn.connect(function(err) {
        if (err) throw err;
        conn.query('SELECT ID FROM registrazione WHERE username = "' + username + '" AND psw = "' + pass + '"', function(err, result, fields) {
            if (err) throw err;
            if(result.length != 0){
                res.send(result);
                console.log("Login effettuato");
            }else{
                res.send(false);
            }
        });
    });
})
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});