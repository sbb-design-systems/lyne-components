import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/autocomplete.js';
import { SbbAutocompleteBaseElement } from '@sbb-esta/lyne-angular/autocomplete/autocomplete-base-element';

@Directive({
  selector: 'sbb-autocomplete',
  standalone: true,
})
export class SbbAutocomplete extends SbbAutocompleteBaseElement {}
