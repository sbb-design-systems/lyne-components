import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-optgroup.js';
import { SbbOptgroupBaseElement } from '@sbb-esta/lyne-angular/option/optgroup/optgroup-base-element';

@Directive({
  selector: 'sbb-autocomplete-grid-optgroup',
  standalone: true,
})
export class SbbAutocompleteGridOptgroup extends SbbOptgroupBaseElement {}
