import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type {
  SbbDateLike,
  SbbValidationChangeEvent,
} from '@sbb-esta/lyne-elements/core/interfaces.ts';
import type { SbbTimeInputElement } from '@sbb-esta/lyne-elements/time-input.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/time-input.js';

@Directive({
  selector: 'sbb-time-input',
  standalone: true,
})
export class SbbTimeInput extends HTMLElement {
  #element = inject(ElementRef<SbbTimeInputElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set input(value: string | HTMLElement) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.input = value));
  }
  public get input(): string | HTMLElement {
    return this.#element.nativeElement.input;
  }

  @Input()
  public set valueAsDate(value: SbbDateLike | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsDate = value));
  }
  public get valueAsDate(): SbbDateLike | null {
    return this.#element.nativeElement.valueAsDate;
  }

  @Output() public didChange: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'didChange',
  );

  @Output() public validationChange: Observable<SbbValidationChangeEvent> = fromEvent(
    this.#element.nativeElement,
    'validationChange',
  );
}
