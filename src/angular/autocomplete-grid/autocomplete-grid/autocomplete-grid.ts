import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid.js';

import { SbbAutocompleteBaseElement } from '@sbb-esta/lyne-angular/autocomplete/autocomplete-base-element.js';

@Directive({
  selector: 'sbb-autocomplete-grid',
  standalone: true,
})
export class SbbAutocompleteGrid extends SbbAutocompleteBaseElement {}
