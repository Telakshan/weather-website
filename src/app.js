//Exposes a single function, express
const express = require('express')
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);



//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Big Daddy'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Big daddy'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        email: 'telakshanb@gmail.com',
        name: 'Big Daddy'
    })
})

// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// });


// app.get('', (req, res)=>{
//     res.send('Hello express');
// });
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 100
//     })
// });

//not rendered because express executes in order
app.get('/help', (req, res) => {
    res.send([{
        name: 'Andrew',
    },{
        name: 'Ju-On'
    }]) 
})

// app.get('/about', (req, res) => {
//     res.send('<h1>Weather</h2>');
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address was not provided"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});




// app.get('/product',(req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: "You must provide a address"
//         })
//     }
//     console.log(req.query.search);

//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        eMes: 'Help article not found',
        name: 'Big Daddy'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Big Daddy',
        eMes: 'Page not found'
    })
})


//starts up the server
app.listen(port, () => {
    console.log(`Server is up at ${port}...`);
});


