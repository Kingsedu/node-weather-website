const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utilis/geocoding');
const forecast = require('./utilis/forecast');
//calling of the express module
const app= express();


//Define path for express configuration
const pathHostPublic = path.join(__dirname,'../public');
const pathViews = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials');

//setting up express with hbs
app.set('view engine', 'hbs');

//set the views directory,
app.set('views', pathViews);

hbs.registerPartials(partialPath);


//this routes to the index
app.use(express.static(pathHostPublic));



app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'chinedu'
    })
})

app.get('/about', (req,res)=>{
    res.render("about", {
        title: 'About me',
        name: 'chinedu'
    })
})


app.get('/help', ( req, res) =>{
    res.render('help', {
        titleText: 'this is some helpful text',
        title: 'Help',
        name: 'chinedu'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })  
    }
    geocode(req.query.address, (error, { latitude, longitude } = {} ) =>{
        if(error){
            return res.send({
                error: error
            })
        }
        
    forecast(latitude, longitude, (error,{ temp, humidity,pressure, des })=>{
        if(error){
            return res.send({
                error: error
            })
        }
        res.send({
            forecast: {
                temp: temp,
                humidity: humidity,
                pressure: pressure,
                des: des
            },
            location: {
                latitude,
                longitude,
                location: req.query.address
            }
        })
    })
    //     // console.log('error', error);
        // console.log('latitude', latitude ,'longitude', longitude);
    })
})
app.get('/products', (request, response) => {
    if(!request.query.search){
        return response.send({
            error: 'you must provide a search term'
        })
    }
    console.log(request.query)
    response.send({
        product: []
    })
})
//using the render of hbs for help file;
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: 404,
        name: 'chinedu umeh',
        errormessage: 'HELP ARTICLE NOT FOUND'

    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        title: 404,
        name: 'chinedu umeh',
        errormessage: 'PAGE NOT FOUND'

    })
})


app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})








































// app.get('/help/*', (req, res) =>{
//     res.send('<strong>Article not found in this folder</strong>')
// })

// app.get('*', (req,res)=>{
//     res.send('<h1>this is the 404 page</h1>')
// })

//using the hbs to render express






//     res.send([
//         {
//         location : 'Jos, Plateau State, Nigeria',
//         address : req.query.address,
//         // forecast : [ {
//         //     day: 'monday',
//         //     description: 'cloudy',
//         //     temp: 25
//         // },{
//         //     day: 'Tuesday',
//         //     description: 'rainy',
//         //     temp:20
//         // }],







//checking for the name of the path of file
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));


// app.get('', (req, res)=>{
//         res.send('<h1>Using express for a weather App</h1>')
// })
// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'chinedu',
//         age: 25,
//         location: 'nairobi'
//     },{
//         name: 'Sarah',
//         age: 25,
//         location: 'southeast'
//     }])
// })
// //the about pagevto render HTML
// app.get('/about', (req, res)=>{
//     res.send('<h1>This is the about page</h1> </br> <p>this page tells you everything you need to know about the <strong>weather</strong> the location of where you placed it</p>')
// })