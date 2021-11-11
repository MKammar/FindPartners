const express = require('express');
const app = express();

app.use(express.static('./dist/FindPartnersFE'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

app.get('/', function(req, res) {
    res.send('hello to My APP');
});



require("./app/routes/routes.js")(app);

var server = app.listen(3080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening on port "+port);
 })