let express = require('express');
let app = express();
let weather = require('weather-js');
let ejslayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(ejslayouts)

// SOURCE: I found this fix to allow me to link my css https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/weather/', (req, res) => {
    weather.find({search: req.query.zipcode, degreeType: 'F', timezone: '-7'}, function(err, result) {
        if(err) {
            console.log(err);
        }

        // SOURCE: I had to reference Sarah's solution.  I understand most of this code, but not 100%
        res.render('results', { query: req.query.zipcode, result: result[0]})
    })
});


app.listen(8000, () => {console.log("I hope it works")});