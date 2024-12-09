import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbIconBase as SbbIconBaseElement } from '@sbb-esta/lyne-elements/icon.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

export abstract class SbbIconBase extends HTMLElement {
  #element = inject(ElementRef<SbbIconBaseElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'no-sanitize', transform: booleanAttribute })
  public set noSanitize(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.noSanitize = value));
  }
  public get noSanitize(): boolean {
    return this.#element.nativeElement.noSanitize;
  }
}
