const express = require('express');
const app = express();
const port = 5000;

require('./config/handlebars')(app);


app.get('/', (req, res) => {
    res.send('Hello there!')
});

app.listen(port, () => console.log(`App is listening on port ${port}...`))

