import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/menu/menu-link.js';

import { SbbDisabledInteractiveMixin, SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbMenuActionCommonElementMixin } from '@sbb-esta/lyne-angular/menu/common/menu-action-common.js';

@Directive({
  selector: 'sbb-menu-link',
  standalone: true,
})
export class SbbMenuLink extends SbbDisabledInteractiveMixin(
  SbbMenuActionCommonElementMixin(SbbLinkBaseElement),
) {}
