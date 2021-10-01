const fs = require("fs");

const express = require('express');
const app = express();
const port = 3001;

app.get('/reports/', (req, res) => {
    var reports = fs.readFileSync("./data/reports.json").toString('utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.parse(reports));
});

app.post('/reports/:reportId', (req, res) => {
    /* TODO */
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
