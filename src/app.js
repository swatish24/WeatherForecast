const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express(); 

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Swati'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please enter the address'
        })
    }
    geocode(req.query.address,(error, data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude, data.longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location: data,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
    
})


app.get('/*', (req,res)=>{
    res.render('404',{
        message: 'Page not found',
        title: '404',
        name: 'Swati'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on PORT 3000')
})