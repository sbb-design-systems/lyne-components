import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type {
  SbbMiniButtonGroupElement,
  SbbMiniButtonGroupSize,
} from '@sbb-esta/lyne-elements/button/mini-button-group.js';

import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';
import '@sbb-esta/lyne-elements/button/mini-button-group.js';

@Directive({
  selector: 'sbb-mini-button-group',
  standalone: true,
})
export class SbbMiniButtonGroup extends SbbNegativeMixin(HTMLElement) {
  #element = inject(ElementRef<SbbMiniButtonGroupElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Input()
  public set size(value: SbbMiniButtonGroupSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbMiniButtonGroupSize {
    return this.#element.nativeElement.size;
  }
}
