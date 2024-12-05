import { Directive, ElementRef, inject, Output } from '@angular/core';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';
import { fromEvent, type Observable } from 'rxjs';

import { SbbOptionBaseElement } from '@sbb-esta/lyne-angular/option/option/option-base-element';

@Directive({
  selector: 'sbb-autocomplete-grid-option',
  standalone: true,
})
export class SbbAutocompleteGridOption extends SbbOptionBaseElement {
  #element = inject(ElementRef<SbbAutocompleteGridOption>);

  @Output() public selectionChange: Observable<undefined> = fromEvent(
    this.#element.nativeElement,
    'selectionChange',
  );

  @Output() public optionSelected: Observable<undefined> = fromEvent(
    this.#element.nativeElement,
    'optionSelected',
  );
}
