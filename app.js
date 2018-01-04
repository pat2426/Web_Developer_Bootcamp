var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campgrounds"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds"),
    passport    =require("passport"),
    User        =require("./models/user"),
    LocalStrategy =require("passport-local"),
    methodOverride = require("method-override")
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index")
    
mongoose.connect("mongodb://localhost/yelp_camp_v3");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
//seed database
//seedDB();

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Dogas are better than cats",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});
app.use(authRoutes);
app.use("campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

// ====================
// COMMENTS ROUTES
// ====================



//============================
//AUTH ROUTES
//============================

//show register form


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});