import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/paginator/compact-paginator.js';

import { SbbPaginatorCommonElementMixin } from '@sbb-esta/lyne-angular/paginator/common/paginator-common.js';

@Directive({
  selector: 'sbb-compact-paginator',
  standalone: true,
})
export class SbbCompactPaginator extends SbbPaginatorCommonElementMixin(HTMLElement) {}
