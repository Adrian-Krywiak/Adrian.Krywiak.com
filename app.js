const express = require('express');
proxy = require("express-http-proxy"), app = express();
const port = 3000;

// Serve static files from the /public directory
app.use(express.static(__dirname + '/public'));

function getIpFromReq (req) { // get the client's IP address
    var bareIP = ":" + ((req.connection.socket && req.connection.socket.remoteAddress)
        || req.headers["x-forwarded-for"] || req.connection.remoteAddress || "");
    return (bareIP.match(/:([^:]+)$/) || [])[1] || "127.0.0.1";
}

// proxying requests from /analytics to www.google-analytics.com.
app.use("/analytics", proxy("www.google-analytics.com", {
    proxyReqPathResolver: function (req) {
        return req.url + (req.url.indexOf("?") === -1 ? "?" : "&")
            + "uip=" + encodeURIComponent(getIpFromReq(req));
    }
}));
// Serve particles.js from node_modules
app.use('/analytics.js', express.static(__dirname + '/analytics.js'));
app.use('/particles', express.static(__dirname + '/node_modules/particles.js'));
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/', (req, res) => {
    //return html page
    res.sendFile(__dirname + '/src/views/main/index.html');
});

app.listen(port, () => console.log(`Krywiak Core: Adrian Landing is listening on port ${port}!`));
