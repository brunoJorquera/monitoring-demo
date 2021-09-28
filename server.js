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

const port = process.env.PORT || 5656

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`ZooWeeMama! Server ${port} is running!`))