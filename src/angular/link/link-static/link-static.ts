import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/link/link-static.js';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';
import { SbbInlineLinkCommonElementMixin } from '@sbb-esta/lyne-angular/link/common/inline-link-common';

@Directive({
  selector: 'sbb-link-static',
  standalone: true,
})
export class SbbLinkStatic extends SbbInlineLinkCommonElementMixin(SbbDisabledMixin(HTMLElement)) {}
