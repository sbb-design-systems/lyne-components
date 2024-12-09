import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/title.js';

import { SbbTitleBase } from '@sbb-esta/lyne-angular/title/title-base.js';

@Directive({
  selector: 'sbb-title',
  standalone: true,
})
export class SbbTitle extends SbbTitleBase {}
