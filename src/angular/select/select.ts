import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbSelectElement } from '@sbb-esta/lyne-elements/select.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/select.js';

import {
  booleanAttribute,
  SbbDisabledMixin,
  SbbFormAssociatedMixin,
  SbbNegativeMixin,
  SbbOpenCloseBaseElement,
  SbbRequiredMixin,
} from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-select',
  standalone: true,
})
export class SbbSelect extends SbbDisabledMixin(
  SbbNegativeMixin(
    SbbRequiredMixin(
      SbbFormAssociatedMixin<typeof SbbOpenCloseBaseElement, string | string[]>(
        SbbOpenCloseBaseElement,
      ),
    ),
  ),
) {
  #element = inject(ElementRef<SbbSelectElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set placeholder(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.placeholder = value));
  }
  public get placeholder(): string {
    return this.#element.nativeElement.placeholder;
  }

  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  @Input({ transform: booleanAttribute })
  public set readonly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readonly = value));
  }
  public get readonly(): boolean {
    return this.#element.nativeElement.readonly;
  }

  @Output() public change: Observable<void> = fromEvent(this.#element.nativeElement, 'change');

  @Output() public input: Observable<void> = fromEvent(this.#element.nativeElement, 'input');

  public override get type(): string {
    return this.#element.nativeElement.type;
  }

  public get inputElement(): HTMLElement {
    return this.#element.nativeElement.inputElement;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }

  public getDisplayValue(): string {
    return this.#element.nativeElement.getDisplayValue();
  }

  public override formResetCallback(): void {
    return this.#element.nativeElement.formResetCallback();
  }

  public override formStateRestoreCallback(): void {
    return this.#element.nativeElement.formStateRestoreCallback();
  }

  protected override updateFormValue(): void {
    return this.#element.nativeElement.updateFormValue();
  }
}
