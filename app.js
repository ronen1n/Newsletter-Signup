//Requiring express  and initializing the constant "app"const express = require('express')
const express = require('express')
const https = require("https");
const app = express()

//Can give services to decide which port and port 3000 as local
const port = process.env.PORT || 3000;
//The public folder which holds the CSS and images
app.use(express.static('public'))
//Recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

//As soon as the sign-up button is pressed execute this
app.post('/', (req, res) => {
    //Getting html values you pass from the web
    const fName = req.body.fName
    const lName = req.body.lName
    const email = req.body.email
    //Creating an object with the users data
    const data = {
        members: [
            {
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                },
                email_address: email,
                status: "subscribed"
            }
        ]
    }

    //Convert javascript code to json string
    const jsonData = JSON.stringify(data)
    //API url
    const url = config.URL
    const options = {
        method: "POST",
        auth: config.AUTH
    }

    //Uploading the data to the server
    const request = https.request(url, options, function (response) {
        //Check if the website is working
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            //If all goes well show failure page
            res.sendFile(__dirname + '/failure.html')
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()
})

//Failure page added option to redirect to main page
app.post("/failure", function (req, res) {
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Newsletter app listening on port ${port}`)
})
