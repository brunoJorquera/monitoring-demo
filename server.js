const express = require("express")
const path = require('path')
const app = express()

const Rollbar = require("rollbar")

const rollbar = new Rollbar({
    accessToken: '83645117e0c94fca917c364866c89286',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.get('/', (req,res) =>{
        res.sendFile(path.join(__dirname, './client/index.html'))
        rollbar.info("Html was monitored successfuly!")
})

// Student stuff-----------------------------------------------------------------------------------------------
const studentArr = []

app.post('/api/students', (req,res) => {
    const {name} = req.body
    // or const name = req.body.name
    studentArr.push(name)

    rollbar.log('Student successfully added!')
    res.status(200).send(studentArr)
})

const port = process.env.PORT || 5656

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`ZooWeeMama! Server ${port} is running!`))