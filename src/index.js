const express = require('express');
const app = express();
const routes = require('./routes');
const port = 5000;

require('./config/handlebars')(app);

app.use('/static', express.static('public'));


// app.get('/', (req, res) => {
//     res.send('Hello there!')
// });

app.use(routes);

app.listen(port, () => console.log(`App is listening on port ${port}...`))

