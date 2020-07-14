require('dotenv').config()

const express = require('express')
const app = express();
const path = require('path')
var cors = require('cors')

const bodyParser = require('body-parser')


const Rotas = require('./routes/Routes')
const TeamLeadRotas = require('./routes/TeamLeadRoutes')
const AdminRotas = require('./routes/AdminRoutes')
const middlewareLogin = require('./middlewares/middlewareLogin');
const { AppStream } = require('aws-sdk');

//Settings
app.use(cors())
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/files', express.static(path.resolve(__dirname, "..", "src", "tmp", "uploads")))



// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Access-Token, Origin,  X-Requested-With, Content-Type,Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
  next();
});

//Routes
app.use('/', Rotas)
app.use('/admin', AdminRotas)
app.use('/developer', Rotas)
app.use('/teamlead', TeamLeadRotas)

app.listen(app.get('port'), () => {
  console.log("Start Sever on port " + app.get('port'));
})


