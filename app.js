const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


app.use(express.static("public"));

// api key
// e0d8bc2b9980e12f39345d9391e5099f-us21

// list_id
// bac57e2f07.

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.eName;
  
    var subscribingUser = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    };
  
    var jsonData = JSON.stringify(subscribingUser);
  
    var url = "https://us21.api.mailchimp.com/3.0/lists/bac57e2f07/members";
    var options = {
      method: "POST",
      auth: "Vishesh:e0d8bc2b9980e12f39345d9391e5099f-us21"
    };
  
    const request = https.request(url, options, function (response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        
    });
  
    request.write(jsonData);
    request.end();
  });


app.post("/success" , function(req,res){
  res.redirect("/");
});
  
app.post("/failure" , function(req,res){
  res.redirect("/");
});

app.listen( process.env.PORT || 3000, function () {
  console.log("the server in running on port 3000");
});
