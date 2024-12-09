import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/link/block-link-button.js';

import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '@sbb-esta/lyne-angular/core';
import { SbbBlockLinkCommonElementMixin } from '@sbb-esta/lyne-angular/link/common/block-link-common.js';

@Directive({
  selector: 'sbb-block-link-button',
  standalone: true,
})
export class SbbBlockLinkButton extends SbbBlockLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {}
