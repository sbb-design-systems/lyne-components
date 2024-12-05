import { Directive, ElementRef, inject } from '@angular/core';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-button.js';
import type { SbbAutocompleteGridButtonElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-button.js';
import type { SbbAutocompleteGridOptionElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';

import { SbbDisabledMixin, SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin';

@Directive({
  selector: 'sbb-autocomplete-grid-button',
  standalone: true,
})
export class SbbAutocompleteGridButton extends SbbDisabledMixin(
  SbbNegativeMixin(SbbIconNameMixin(HTMLElement)),
) {
  #element = inject(ElementRef<SbbAutocompleteGridButtonElement>);

  public get option(): SbbAutocompleteGridOptionElement | null {
    return this.#element.nativeElement.option;
  }
}
