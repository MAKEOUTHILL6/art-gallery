const express = require('express');
const { handlebars } = require('./config/handlebars');
const { InitializeDatabase } = require('./config/database');
const routes = require('./routes');

const app = express();
const port = 5000;


// TEMPLATE ENGINE 
handlebars(app);

// STATIC FILES 
app.use('/static', express.static('public'));


// MIDDLEWARES 
app.use(routes);


InitializeDatabase()
    .then(() => {
        app.listen(port, () => console.log('Server listening on port 5000'));
    })
    .catch(err => console.log(err));
