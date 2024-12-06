import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbTagElement, SbbTagSize } from '@sbb-esta/lyne-elements/tag/tag.js';
import { fromEvent, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/tag/tag.js';
import {
  booleanAttribute,
  SbbButtonBaseElement,
  SbbDisabledTabIndexActionMixin,
} from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-tag',
  standalone: true,
})
export class SbbTag extends SbbIconNameMixin(SbbDisabledTabIndexActionMixin(SbbButtonBaseElement)) {
  #element = inject(ElementRef<SbbTagElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set amount(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.amount = value));
  }
  public get amount(): string {
    return this.#element.nativeElement.amount;
  }

  @Input({ transform: booleanAttribute })
  public set checked(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
  }
  public get checked(): boolean {
    return this.#element.nativeElement.checked;
  }

  @Input()
  public set size(value: SbbTagSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbTagSize {
    return this.#element.nativeElement.size;
  }

  @Output() public input: Observable<void> = fromEvent(this.#element.nativeElement, 'input');

  @Output() public didChange: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'didChange',
  );

  @Output() public change: Observable<void> = fromEvent(this.#element.nativeElement, 'change');
}
