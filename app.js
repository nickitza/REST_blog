var bodyParser      = require("body-parser"),
    express         = require("express"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override"),
    app             = express()

//* APP CONFIG
mongoose.connect("mongodb://localhost:27017/rest_blog", {useNewUrlParser: true})
app.set('view engine', "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

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
app.get('/', function(req, res){
  res.redirect('/blogs')
})
//*INDEX
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){console.log(err)
    }else{
      res.render("index", {blogs: blogs})
    }
  })
})
//*NEW
app.get("/blogs/new", function(req, res){
  res.render("new")
})
//*CREATE
app.post('/blogs', function(req, res){
  Blog.create(req.body.blog, function(err, blog){
    if(err){
      console.log(err)
      res.render("new")
    }else{
      res.redirect('/blogs')
    }
  })
})
//*SHOW
app.get('/blogs/:id', function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      res.redirect("/blogs")
    }else{
      res.render("show", {blog: blog})
    }
  })
})
//*EDIT
app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, blog){
      if(err){
        res.redirect("/blogs")
      }else{
        res.render("edit", {blog: blog})
      }
    })
})
//*UPDATE
app.put('/blogs/:id', function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect('/')
    }else{
      res.redirect("/blogs/" + req.params.id)
    }
  })
})

//*DESTROY
app.delete('/blogs/:id', function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err)
      res.redirect("/blogs")
    }else{
      res.redirect("/blogs")
    }
  })
})








// ===========================================================//
  app.listen(3000, function(){
    console.log("*** SERVER RUNNING ***")
  })