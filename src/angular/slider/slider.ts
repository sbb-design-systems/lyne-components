import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  Output,
  inject,
  numberAttribute,
} from '@angular/core';
import type { SbbSliderElement } from '@sbb-esta/lyne-elements/slider.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/slider.js';

import {
  booleanAttribute,
  SbbDisabledMixin,
  SbbFormAssociatedMixin,
} from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-slider',
  standalone: true,
})
export class SbbSlider extends SbbDisabledMixin(SbbFormAssociatedMixin(HTMLElement)) {
  #element = inject(ElementRef<SbbSliderElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set readonly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readonly = value));
  }
  public get readonly(): boolean {
    return this.#element.nativeElement.readonly;
  }

  @Input({ alias: 'start-icon' })
  public set startIcon(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.startIcon = value));
  }
  public get startIcon(): string {
    return this.#element.nativeElement.startIcon;
  }

  @Input({ alias: 'end-icon' })
  public set endIcon(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.endIcon = value));
  }
  public get endIcon(): string {
    return this.#element.nativeElement.endIcon;
  }

  @Input()
  public override set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public override get value(): string | null {
    return this.#element.nativeElement.value;
  }

  @Input({ alias: 'value-as-number', transform: numberAttribute })
  public set valueAsNumber(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsNumber = value));
  }
  public get valueAsNumber(): number {
    return this.#element.nativeElement.valueAsNumber;
  }

  @Input()
  public set min(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.min = value));
  }
  public get min(): string {
    return this.#element.nativeElement.min;
  }

  @Input()
  public set max(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.max = value));
  }
  public get max(): string {
    return this.#element.nativeElement.max;
  }

  @Output() public didChange: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'didChange',
  );

  public override get type(): string {
    return this.#element.nativeElement.type;
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
