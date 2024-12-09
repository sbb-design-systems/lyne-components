import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/navigation/navigation-link.js';

import { SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbNavigationActionCommonElementMixin } from '@sbb-esta/lyne-angular/navigation/common/navigation-action-common.js';

@Directive({
  selector: 'sbb-navigation-link',
  standalone: true,
})
export class SbbNavigationLink extends SbbNavigationActionCommonElementMixin(SbbLinkBaseElement) {}
