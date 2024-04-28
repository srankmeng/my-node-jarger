const tracer = require("./tracing")("app_0");
const express = require('express');
const api = require("@opentelemetry/api");
const axios = require('axios');

//initialize the express app
const app = express();

//register route used to simulate a healthy request
app.get('/health', async (req, res) => {
    // Example for start custom span in comment

    // tracer.startActiveSpan('healthcheck', async (span) => {
    //     //add event with custom information to span
    //     span.addEvent('starting operation', { custom_headers: JSON.stringify(req.headers) });
    //     await new Promise(resolve => setTimeout(resolve, 1000));

    //     const { data: data1 } = await axios.get('http://localhost:4010/health')

    //     const { data: data2 } = await axios.get('http://localhost:4020/health')
    //     //add event to span
    //     span.addEvent('operation finished!');
    //     //end the span
    //     span.end();
    //     res.json({ healthy: true, action: `app0 => ${data1.action} , app0 => ${data2.action}` });
    // })

    await new Promise(resolve => setTimeout(resolve, 1000));
    const { data: data1 } = await axios.get('http://localhost:4010/health')
    const { data: data2 } = await axios.get('http://localhost:4020/health')
    res.json({ healthy: true, action: `app0 => ${data1.action} , app0 => ${data2.action}` });
})

app.get('/crash', (req, res) => {
    const span = api.trace.getActiveSpan();
    try {
        throw new Error("CRASH!");
    } catch (e) {
        span.setStatus({ code: api.SpanStatusCode.ERROR })
        span.addEvent('CRASH!');
        res.status(500).send("CRASH!");
    }
});

//start the app
app.listen(4000, () => {
    console.log(`Example app listening on port 4000`)
});