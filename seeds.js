var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: "Camp Cloud",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqUPwY3m-uhuWN-yAY4Rnadl9cavTGq8PpQaHfmat4sEEJlDf",
        description: "Lorem ipsum dolor sit amet, inani omittantur ut eos, has viris suavitate ne. Est doming discere constituam at, usu affert nemore omittam ex. Nulla necessitatibus cu pro, eum ex liber regione, ut lobortis scripserit pro. Vix pericula definitionem ad, mea sumo simul aliquando no. Saepe ignota fabulas ne nam, mei omnium intellegam et."
    },
    {
        name: "Camp Round",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Jrc8mqhlrZIyn0Z7D1dy04sR6bpO4n3hWHQOA2BSLkmib902aQ",
        description: "Viderer deleniti his at, molestie assueverit ex sed. Sit ei saperet constituam, pri in iisque regione, vim doming accusata neglegentur et. Eos autem omittam scripserit te, mutat porro dicat sed in, no mei eius falli reprehendunt. Usu ex viderer lobortis."
    },
    {
        name: "Camp Blank",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkeBISqXn7emcZPQFFwlZ0fDWnbifxwg8NixKcu3l9b7onK9z3GA",
        description: "Quidam mandamus explicari id usu. At vis commodo assentior, eam at quis iisque. Pro ad eros salutatus, veritus conceptam at ius, qui id inani iisque dissentiunt. Qui id probo doming delectus. Et mei iuvaret legimus, aperiam assentior efficiantur pro at, malis munere percipitur te sea."
    }
    ]
//remove campgrounds
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
       if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        }); 
    }); 
    //add a few comments
}

module.exports = seedDB;
