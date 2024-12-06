import { Directive, ElementRef, inject } from '@angular/core';
import type { SbbStepLabelElement } from '@sbb-esta/lyne-elements/stepper/step-label.js';
import type { SbbStepElement } from '@sbb-esta/lyne-elements/stepper/step.js';

import '@sbb-esta/lyne-elements/stepper/step-label.js';
import { SbbButtonBaseElement, SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-step-label',
  standalone: true,
})
export class SbbStepLabel extends SbbIconNameMixin(SbbDisabledMixin(SbbButtonBaseElement)) {
  #element = inject(ElementRef<SbbStepLabelElement>);

  public get step(): SbbStepElement | null {
    return this.#element.nativeElement.step;
  }
}
