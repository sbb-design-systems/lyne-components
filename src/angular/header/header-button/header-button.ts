import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/header/header-button.js';
import { SbbButtonBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbHeaderActionCommonElementMixin } from '@sbb-esta/lyne-angular/header/common/header-action-common';

@Directive({
  selector: 'sbb-header-button',
  standalone: true,
})
export class SbbHeaderButton extends SbbHeaderActionCommonElementMixin(SbbButtonBaseElement) {}
