/** @entrypoint */
import { SbbStepperElement } from './stepper/stepper.component.ts';

export * from './stepper/stepper.component.ts';

SbbStepperElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/stepper/stepper.js' has been deprecated.
Use either '@sbb-esta/elements/stepper.js' or '@sbb-esta/elements/stepper.pure.js' instead.`);
