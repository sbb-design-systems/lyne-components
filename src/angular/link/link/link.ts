import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/link/link.js';
import { SbbDisabledMixin, SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbInlineLinkCommonElementMixin } from '@sbb-esta/lyne-angular/link/common/inline-link-common';

@Directive({
  selector: 'sbb-link',
  standalone: true,
})
export class SbbLink extends SbbInlineLinkCommonElementMixin(
  SbbDisabledMixin(SbbLinkBaseElement),
) {}
