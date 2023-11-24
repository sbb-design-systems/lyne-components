import { parentPort, workerData } from 'worker_threads';
import { render } from '@lit-labs/ssr';
if (parentPort === null) {
  throw new Error('worker.js must only be run in a worker thread');
}

const { template, modules } = workerData;
if (modules?.length) {
  await Promise.all(modules.map((m) => import(m)));
}
// Dangerously spoof TemplateStringsArray by adding back the \`raw\` property
// property which gets stripped during serialization of the TemplateResult.
// This is needed to get through the check here
// https://github.com/lit/lit/blob/1fbd2b7a1e6da09912f5c681d2b6eaf1c4920bb4/packages/lit-html/src/lit-html.ts#L867
const strings = template.strings;
strings.raw = strings;
let rendered = '';
for (const str of render({ ...template, strings }, { deferHydration: true })) {
  rendered += str;
}
parentPort.postMessage(rendered);
