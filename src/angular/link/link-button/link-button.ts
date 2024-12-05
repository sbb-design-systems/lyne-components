import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/link/link-button.js';
import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '@sbb-esta/lyne-angular/core';
import { SbbInlineLinkCommonElementMixin } from '@sbb-esta/lyne-angular/link/common/inline-link-common';

@Directive({
  selector: 'sbb-link-button',
  standalone: true,
})
export class SbbLinkButton extends SbbInlineLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {}
