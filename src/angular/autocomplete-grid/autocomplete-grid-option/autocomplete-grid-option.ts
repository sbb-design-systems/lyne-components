import { Directive, ElementRef, inject, Output } from '@angular/core';
import type { SbbAutocompleteGridOptionElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';

import { SbbOptionBaseElement } from '@sbb-esta/lyne-angular/option/option/option-base-element.js';

@Directive({
  selector: 'sbb-autocomplete-grid-option',
  standalone: true,
})
export class SbbAutocompleteGridOption extends SbbOptionBaseElement {
  #element = inject(ElementRef<SbbAutocompleteGridOptionElement>);

  @Output() public selectionChange: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'selectionChange',
  );

  @Output() public optionSelected: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'optionSelected',
  );
}
