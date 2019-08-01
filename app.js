var bodyParser = require("body-parser")
    express    = require("express"),
    mongoose   = require("mongoose"),
    app        = express()

mongoose.connect("mongodb://localhost:27017/rest_blog", {useNewUrlParser: true})
app.set('view engine', "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function(){
  console.log("*** SERVER RUNNING ***")
})

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  create: {type: Date, default: Date.now}
})