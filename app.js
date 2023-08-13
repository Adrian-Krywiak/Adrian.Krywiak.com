const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the /public directory
app.use(express.static(__dirname + '/public'));

// Serve particles.js from node_modules
app.use('/particles', express.static(__dirname + '/node_modules/particles.js'));
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/', (req, res) => {
    //return html page
    res.sendFile(__dirname + '/src/views/main/index.html');
});

app.listen(port, () => console.log(`Krywiak Core: Adrian Landing is listening on port ${port}!`));
