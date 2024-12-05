import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbDividerElement } from '@sbb-esta/lyne-elements/divider.js';

import '@sbb-esta/lyne-elements/divider.js';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-divider',
  standalone: true,
})
export class SbbDivider extends SbbNegativeMixin(HTMLElement) {
  #element = inject(ElementRef<SbbDividerElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }
}
