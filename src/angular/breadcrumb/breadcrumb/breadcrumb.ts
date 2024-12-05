import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/breadcrumb/breadcrumb.js';
import { SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin';

@Directive({
  selector: 'sbb-breadcrumb',
  standalone: true,
})
export class SbbBreadcrumb extends SbbIconNameMixin(SbbLinkBaseElement) {}
