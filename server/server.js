const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
let io = require('socket.io')
let mongoose = require('mongoose')
let bodyParser = require('body-parser');
var cors = require('cors')

let Definition = mongoose.model('definition', {
    word: String,
    definition: String,
    courseID: String
})

let Course = mongoose.model('course', {
    courseName: String
})

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use("*", cors())

mongoose.Promise = Promise;

let dbURL = "mongodb://RhysJones:Scoobydoo2!@ds131753.mlab.com:31753/learning-node"

app.get('/courses', async (req, res) => {
    Course.find({}, (err, courses) => {
        res.send(courses)
    })
})

app.post('/course', async (req, res) => {

    try{
        let course = new Course(req.body)
        
        let saved = await course.save().then(course => {
            res.send(course)
        })
    }
    catch(error)
    {
        res.sendStatus(500)
    }
})

app.delete('/course/:id', async (req, res) => {
    Course.findByIdAndDelete(req.params.id).then((course) => {
        res.send(course)
    })
})

app.get('/definitions/:id', async (req, res) => {
    Definition.find({courseID: req.params.id}, (err, definitions) => {
        res.send(definitions)
    })
})

app.post('/definition', async (req, res) => {
    
    try
    {
        let definition = new Definition(req.body)
        
        console.log(definition)

        let saved = await definition.save().then(definition => {
            res.send(definition)
        })
    }
    catch(error)
    {
        res.sendStatus(500)
    }
})

app.delete('/definition/:id', async (req, res) => {
    Definition.findByIdAndDelete(req.params.id, (err, definition) => {
        if(err){
            res.send(err)
        }else{
            res.send(definition)
        }
    })
})

app.listen(port, () => console.log(`Listening on port: ${port}`))

mongoose.connect(dbURL, {useNewUrlParser: true }, (err) =>{
    console.log("mongo DB connection", err);
});

app.get('/express_backend', (req, res) => {
    res.send({express:'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'})
})