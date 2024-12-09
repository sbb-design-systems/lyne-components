import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbCheckboxGroupElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-group.js';
import type {
  SbbCheckboxPanelElement,
  SbbCheckboxSize,
  SbbCheckboxElement,
} from '@sbb-esta/lyne-elements/checkbox.js';
import type { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import '@sbb-esta/lyne-elements/checkbox/checkbox-group.js';

import { booleanAttribute, SbbDisabledMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-checkbox-group',
  standalone: true,
})
export class SbbCheckboxGroup extends SbbDisabledMixin(HTMLElement) {
  #element = inject(ElementRef<SbbCheckboxGroupElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set required(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.required = value));
  }
  public get required(): boolean {
    return this.#element.nativeElement.required;
  }

  @Input()
  public set size(value: SbbCheckboxSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbCheckboxSize {
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

  public get checkboxes(): (SbbCheckboxElement | SbbCheckboxPanelElement)[] {
    return this.#element.nativeElement.checkboxes;
  }
}
