const express       = require('express');
const cors          = require('cors');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const http = require('http');
const app = express();

/*  require('./routes')(app); */

app.use(logger('dev'));



//validacion de rutas
app.use(cors());
// habilitar body-parser
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */

/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */


/* Agruegué el de express que el de bodyparser daba deprecate */
app.use(express.json({limit:"50mb"}));  
app.use(express.urlencoded({limit:"50mb" , extended: false }));  


require("./routes")(app);


/* genera  las tablas en la base de datos */
/*    const db = require("./models");

 db.sequelize.sync();    */

 app.use(express.static('./public'));


app.get('*', (req, res) => res.status(200).send({
     message: 'Index.',
}));




const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;