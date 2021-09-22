const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { title } = require('process')
const { SocketAddress } = require('net')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const author = "Dave Hughes"

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: author
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: author
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: 'The cat sat on the mat',
        name: author
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    //pretend to call geocode
    //geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    //     if (error) {
    //         return res.send({error})
    //     }

    //     forecast(latitude, longitude, (error, forecastData = {}) => {
    //         res.send({
    //             forecast: forecastData,
    //             location,
    //             address: req.query.address
    //         })
    //     })
    // })

    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia',
        address: req.query.address
    });
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search)
    {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})    

// 404 handler, comes last as wildcard would match
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: author,
        errorMessage: "Help page Not Found"
    })
})

// 404 handler, comes last as wildcard would match
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Dave",
        errorMessage: "Page Not Found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})