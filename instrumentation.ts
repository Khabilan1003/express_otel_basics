/*instrumentation.ts*/
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
// import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
// import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";

// Only OpenTelemetry. It will display the trace data in the console.
const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "yourServiceName",
    [SEMRESATTRS_SERVICE_VERSION]: "1.0",
  }),
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Telemetry + Jaeger. It will send the trace data to the jaeger.

// const sdk = new NodeSDK({
//   resource: new Resource({
//     [SEMRESATTRS_SERVICE_NAME]: "yourServiceName",
//     [SEMRESATTRS_SERVICE_VERSION]: "1.0",
//   }),
//   traceExporter: new OTLPTraceExporter({
//     // optional - default url is http://localhost:4318/v1/traces
//     url: "http://localhost:4318/v1/traces",
//     // optional - collection of custom headers to be sent with each request, empty by default
//     headers: {},
//   }),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: new OTLPMetricExporter({
//       url: "http://localhost:4318/v1/traces", // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
//       headers: {}, // an optional object containing custom headers to be sent with each request
//     }),
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });

sdk.start();