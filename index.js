const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const account = require('./routes/account');

const tempDbPages = require('./config/tempDbPages');
const tempDbListOfPAges = require('./config/tempDpListOfPages');

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.json());

app.get('/search', (req, res) => {
    let myQuery = req.query.query;
    // let b = req.query.type;
    let myResponse = tempDbListOfPAges.tempArrayOfArticles.filter( a => a.title.toLowerCase().includes(myQuery));

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(JSON.stringify(myResponse));
})

app.get('/page/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    tempDbPages.page[0].title = req.params.id.split('_').join(' ');
    res.send(JSON.stringify(tempDbPages.page[0]));
})

app.use('/account', account);

app.listen(port, () => {
    console.log(`server working. port: ${port}`);
});