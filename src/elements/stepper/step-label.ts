/** @entrypoint */
import { SbbStepLabelElement } from './step-label/step-label.component.ts';

export * from './step-label/step-label.component.ts';

SbbStepLabelElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/stepper/step-label.js' has been deprecated.
Use either '@sbb-esta/elements/stepper.js' or '@sbb-esta/elements/stepper.pure.js' instead.`);
