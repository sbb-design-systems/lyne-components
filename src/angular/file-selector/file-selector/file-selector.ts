import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/file-selector/file-selector.js';

import { SbbFileSelectorCommonElementMixin } from '@sbb-esta/lyne-angular/file-selector/common/file-selector-common.js';

@Directive({
  selector: 'sbb-file-selector',
  standalone: true,
})
export class SbbFileSelector extends SbbFileSelectorCommonElementMixin(HTMLElement) {}
