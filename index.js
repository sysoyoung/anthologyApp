const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const account = require('./routes/account');
const article = require('./routes/article');
const page = require('./routes/page');
const search = require('./routes/search');

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.json());

app.use('/account', account);
app.use('/article', article);
app.use('/page', page);
app.use('/search', search);

app.listen(port, () => {
    console.log(`server working. port: ${port}`);
});
