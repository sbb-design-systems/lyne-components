import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-row.js';

@Directive({
  selector: 'sbb-autocomplete-grid-row',
  standalone: true,
})
export class SbbAutocompleteGridRow extends HTMLElement {}
