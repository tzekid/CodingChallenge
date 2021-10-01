const fs = require("fs");

const express = require('express');
const app = express();
const port = 3001;

// receive json bodies, see https://stackoverflow.com/a/68075301/3316831
app.use(express.urlencoded())
app.use(express.json())

app.get('/reports/', (req, res) => {
    var reports = fs.readFileSync("./data/reports.json").toString('utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.parse(reports));
});

app.put('/reports/:reportId', (req, res) => {
    res.send('report ' + req.params.reportId);
    console.log('id:', req.params.reportId, 'sent body:', req.body);

    if (!res.headersSent)
        res.status(200).send({}) // answer ?
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
