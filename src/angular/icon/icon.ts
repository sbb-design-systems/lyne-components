import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbIconElement } from '@sbb-esta/lyne-elements/icon.js';

import '@sbb-esta/lyne-elements/icon.js';
import { SbbIconBase } from '@sbb-esta/lyne-angular/icon/icon-base.js';

@Directive({
  selector: 'sbb-icon',
  standalone: true,
})
export class SbbIcon extends SbbIconBase {
  #element = inject(ElementRef<SbbIconElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }
}
