import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/link/block-link.js';

import { SbbDisabledMixin, SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbBlockLinkCommonElementMixin } from '@sbb-esta/lyne-angular/link/common/block-link-common.js';

@Directive({
  selector: 'sbb-block-link',
  standalone: true,
})
export class SbbBlockLink extends SbbBlockLinkCommonElementMixin(
  SbbDisabledMixin(SbbLinkBaseElement),
) {}
