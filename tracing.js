const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { trace } = require("@opentelemetry/api");
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { JaegerPropagator } = require("@opentelemetry/propagator-jaeger");


//Exporter
module.exports = (serviceName) => {

    //Register a new Trace Provider in the global tracer registry under the service name
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
    });
    //Configure Span Processor, Exporter and register the Propagator
    // const exporter = new ConsoleSpanExporter();
    const exporter = new JaegerExporter({endpoint: "http://localhost:14268/api/traces"});
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    provider.register({ propagator: new JaegerPropagator() });

    //Configure Instrumentations
    registerInstrumentations({
        instrumentations: [
            //creates spans for http requests
            new HttpInstrumentation(),    
            //creates spans for http request from the express perspective
            //expects the http instrumentation to be registered    
            new ExpressInstrumentation(),                        
        ],
        //pass in the provider so the instrumentations can create spans
        tracerProvider: provider,
    });
    //return the tracer
    return trace.getTracer(serviceName);
};