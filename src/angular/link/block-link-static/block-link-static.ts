import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/link/block-link-static.js';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';
import { SbbBlockLinkCommonElementMixin } from '@sbb-esta/lyne-angular/link/common/block-link-common';

@Directive({
  selector: 'sbb-block-link-static',
  standalone: true,
})
export class SbbBlockLinkStatic extends SbbBlockLinkCommonElementMixin(
  SbbDisabledMixin(HTMLElement),
) {}
