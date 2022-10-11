const express = require('express');


const app = express();
const port = 5000;



app.get('/', (req, res) => {
    res.send('It works!');
});



app.listen(port, () => console.log('Server listening on port 5000'));