const path = require('path');
const express = require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forcast=require('./utils/forcast');

const app = express()
const port = process.env.PORT || 3000
//define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath =path.join(__dirname,'../templates/views');
const PartialsPath =path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views directory
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(PartialsPath);


//Setup express static directory
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sahil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Sahil',
        HelpText:'This is some helpful text'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sahil'
    })
})

app.get('/weather', (req, res) => {
   if(!req.query.address){
       return res.send({
           error:'Please provide an address'
       })
   }
//    res.send({
//        forcast:'Clear sky',
//        address:req.query.address
//    })
   geocode(req.query.address,(error,{latitude,longitude,Location}={})=>{
       if(error){
           return res.send({
               error
           })
       }
       forcast(latitude,longitude,(error,forcastdata)=>{
          if(error){
              return res.send({error});
          }
          res.send({
              forcast:forcastdata,
              location:Location,
              address:req.query.address

          })
       })
   })   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Sahil',
        errorMessage: 'Help article not found' 
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Sahil',
        errorMessage: 'Page not found' 
    })
})

app.listen(port, () => {
    console.log('Server is up and running');
})