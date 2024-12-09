import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/card/card-link.js';

import { SbbCardActionCommonElementMixin } from '@sbb-esta/lyne-angular/card/common/card-action-common.js';
import { SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-card-link',
  standalone: true,
})
export class SbbCardLink extends SbbCardActionCommonElementMixin(SbbLinkBaseElement) {}
