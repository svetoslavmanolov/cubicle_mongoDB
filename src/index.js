const express = require('express');
const app = express();
const routes = require('./routes');
const port = 5000;
const { initializeDatabase } = require('./config/database');

require('./config/handlebars')(app);

app.use('/static', express.static('public'));



app.use(routes);

initializeDatabase()
.then(() => {
    app.listen(port, () => console.log(`App is listening on port ${port}...`));
    console.log('Database is connected.')
})
.catch((err) => {
    console.log('Cannot connect to DB:', err);
})


