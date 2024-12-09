import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/option/optgroup.js';

import { SbbOptgroupBaseElement } from '@sbb-esta/lyne-angular/option/optgroup/optgroup-base-element.js';

@Directive({
  selector: 'sbb-opt-group',
  standalone: true,
})
export class SbbOptGroup extends SbbOptgroupBaseElement {}
