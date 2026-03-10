/** @entrypoint */
import { SbbStepElement } from './step/step.component.ts';

export * from './step/step.component.ts';

SbbStepElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/stepper/step.js' has been deprecated.
Use either '@sbb-esta/elements/stepper.js' or '@sbb-esta/elements/stepper.pure.js' instead.`);
