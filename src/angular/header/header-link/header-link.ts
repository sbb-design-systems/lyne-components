import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/header/header-link.js';

import { SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbHeaderActionCommonElementMixin } from '@sbb-esta/lyne-angular/header/common/header-action-common.js';

@Directive({
  selector: 'sbb-header-link',
  standalone: true,
})
export class SbbHeaderLink extends SbbHeaderActionCommonElementMixin(SbbLinkBaseElement) {}
