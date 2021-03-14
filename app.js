const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.listen(3000, () => { console.log("Server running") })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

const userRoutes = require('./routes/user')

mongoose
    .connect('mongodb://localhost:27017/arkenea', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(result => { console.log("Db Connected.") })
    .catch(error => { console.log("Error in DB connection") })


app.use('/user', userRoutes);

app.use('/', (req, res, next) => {
    res
        .status(404)
        .send("No such url.")
});