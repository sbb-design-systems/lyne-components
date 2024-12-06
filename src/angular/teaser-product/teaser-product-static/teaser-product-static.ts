import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/teaser-product/teaser-product-static.js';
import { SbbTeaserProductCommonElementMixin } from '@sbb-esta/lyne-angular/teaser-product/common/teaser-product-common.js';

@Directive({
  selector: 'sbb-teaser-product-static',
  standalone: true,
})
export class SbbTeaserProductStatic extends SbbTeaserProductCommonElementMixin(HTMLElement) {}
