import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/teaser-product/teaser-product.js';
import { SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbTeaserProductCommonElementMixin } from '@sbb-esta/lyne-angular/teaser-product/common/teaser-product-common.js';

@Directive({
  selector: 'sbb-teaser-product',
  standalone: true,
})
export class SbbTeaserProduct extends SbbTeaserProductCommonElementMixin(SbbLinkBaseElement) {}
