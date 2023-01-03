const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.sendFile(__dirname + "/index.html")
})

app.post('/', function(req,res){
  const query = req.body.cityName
  const units = "metric"
  const appId = "my_personal_token_available_in_photos"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + appId
  https.get(url, function(response){
    console.log(response.statusMessage);
    response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const desc =weatherData.weather[0].description
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " Celsius.</h1>")
      res.write("<h3>The weather is described as " + desc + ". </h3>")
      res.write("<img src=" + imageURL + ">")
      res.send()
    })
  })

})


app.listen(3000, function(){
  console.log("Server is now running on port 3000")
})
