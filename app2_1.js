const tracer = require("./tracing")("app2_1");
const express = require('express');
const api = require("@opentelemetry/api");

//initialize the express app
const app = express();

//register route used to simulate a healthy request
app.get('/health', async (req, res) => {
    // Example for start custom span in comment

    // tracer.startActiveSpan('healthcheck', async (span) => {
    //     //add event with custom information to span
    //     span.addEvent('starting operation', { custom_headers: JSON.stringify(req.headers) });
    //     await new Promise(resolve => setTimeout(resolve, 1000));
    //     //add event to span
    //     span.addEvent('operation finished!');
    //     //end the span
    //     span.end();
    //     res.json({ healthy: true, action: 'app2_1' });
    // })

    await new Promise(resolve => setTimeout(resolve, 1000));
    res.json({ healthy: true, action: 'app2_1' });
})

//start the app
app.listen(4021, () => {
    console.log(`Example app listening on port 4021`)
});