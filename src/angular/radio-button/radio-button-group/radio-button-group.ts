import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbRadioButtonGroupElement } from '@sbb-esta/lyne-elements/radio-button/radio-button-group.js';
import type {
  SbbRadioButtonSize,
  SbbRadioButtonElement,
  SbbRadioButtonPanelElement,
} from '@sbb-esta/lyne-elements/radio-button.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/radio-button/radio-button-group.js';

import { booleanAttribute, SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-radio-button-group',
  standalone: true,
})
export class SbbRadioButtonGroup extends SbbDisabledMixin(HTMLElement) {
  #element = inject(ElementRef<SbbRadioButtonGroupElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'allow-empty-selection', transform: booleanAttribute })
  public set allowEmptySelection(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.allowEmptySelection = value));
  }
  public get allowEmptySelection(): boolean {
    return this.#element.nativeElement.allowEmptySelection;
  }

  @Input({ transform: booleanAttribute })
  public set required(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.required = value));
  }
  public get required(): boolean {
    return this.#element.nativeElement.required;
  }

  @Input()
  public set size(value: SbbRadioButtonSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbRadioButtonSize {
    return this.#element.nativeElement.size;
  }

  @Input({ alias: 'horizontal-from' })
  public set horizontalFrom(value: SbbHorizontalFrom | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom | null {
    return this.#element.nativeElement.horizontalFrom;
  }

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  @Output() public didChange: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'didChange',
  );

  public get value(): any | null {
    return this.#element.nativeElement.value;
  }

  public get radioButtons(): (SbbRadioButtonElement | SbbRadioButtonPanelElement)[] {
    return this.#element.nativeElement.radioButtons;
  }
}
