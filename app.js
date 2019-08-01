var bodyParser = require("body-parser")
    express    = require("express"),
    mongoose   = require("mongoose"),
    app        = express()

//* APP CONFIG
mongoose.connect("mongodb://localhost:27017/rest_blog", {useNewUrlParser: true})
app.set('view engine', "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

//* MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})
var Blog = mongoose.model("Blog", blogSchema)

//* DUMMY DATA TO START
// Blog.create({
//   title: "Food I Like",
//   image:"https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
//   body: "There are a lot of foods I like. For instance, pancakes."
// })


//* ROUTES
app.get("/blogs", function(req, res){
  res.render("index")
})


  app.listen(3000, function(){
    console.log("*** SERVER RUNNING ***")
  })