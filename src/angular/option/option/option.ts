import { Directive, ElementRef, inject, Output } from '@angular/core';
import '@sbb-esta/lyne-elements/option/option.js';
import type { SbbOptionElement } from '@sbb-esta/lyne-elements/option/option.js';
import { fromEvent, type Observable } from 'rxjs';

import { SbbOptionBaseElement } from '@sbb-esta/lyne-angular/option/option/option-base-element.js';

@Directive({
  selector: 'sbb-option',
  standalone: true,
})
export class SbbOption extends SbbOptionBaseElement {
  #element = inject(ElementRef<SbbOptionElement>);

  @Output() public selectionChange: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'selectionChange',
  );

  @Output() public optionSelected: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'optionSelected',
  );
}
