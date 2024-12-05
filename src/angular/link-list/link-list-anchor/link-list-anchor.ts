import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/link-list/link-list-anchor.js';
import { SbbLinkListBaseElement } from '@sbb-esta/lyne-angular/link-list/common/link-list-base';

@Directive({
  selector: 'sbb-link-list-anchor',
  standalone: true,
})
export class SbbLinkListAnchor extends SbbLinkListBaseElement {}
