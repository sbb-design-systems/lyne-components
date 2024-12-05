import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/card/card-button.js';
import { SbbCardActionCommonElementMixin } from '@sbb-esta/lyne-angular/card/common/card-action-common.js';
import { SbbButtonBaseElement } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-card-button',
  standalone: true,
})
export class SbbCardButton extends SbbCardActionCommonElementMixin(SbbButtonBaseElement) {}
