const tracer = require("./tracing")("app1_0");
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
    //     res.json({ healthy: true, action: 'app1_0' });
    // })
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.json({ healthy: true, action: 'app1_0' });
})

//start the app
app.listen(4010, () => {
    console.log(`Example app listening on port 4010`)
});