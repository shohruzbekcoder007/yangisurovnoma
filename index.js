const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const user_router = require('./routers/user.router')
const group = require('./routers/group.router')
const full_test = require('./routers/create_full_test.router')
const results = require('./routers/results.router')

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('q1y1npar0l'));
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static('./static'));
app.set("view engine", "pug");

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://forhumoyun_aka:forhumoyun_aka@cluster0.ycg5joo.mongodb.net/forhumoyun_aka1?retryWrites=true&w=majority')
  .then(() => {
    console.log('MongoDBga ulanish hosil qilindi...');
  })
  .catch((err) => {
    console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err);
  });

app.use('/user', user_router)
app.use('/group', group)
app.use('/fulltest', full_test)
app.use('/results', results)

app.get("/", (req,res) => {
  const json = require('./static/json/answers.json')
  return res.render('main_all', {
    testlist: [],
    json: json
  })
});

app.listen(port, ()=> {
  console.log(`Application is up and running under localhost:${port}`)
})