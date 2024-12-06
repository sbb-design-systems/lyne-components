import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { Leg, PtRideLeg } from '@sbb-esta/lyne-elements-experimental/core/timetable.js';
import type { SbbPearlChainElement } from '@sbb-esta/lyne-elements-experimental/pearl-chain.js';
import '@sbb-esta/lyne-elements-experimental/pearl-chain.js';

@Directive({
  selector: 'sbb-pearl-chain',
  standalone: true,
})
export class SbbPearlChain extends HTMLElement {
  #element = inject(ElementRef<SbbPearlChainElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set legs(value: (Leg | PtRideLeg)[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.legs = value));
  }
  public get legs(): (Leg | PtRideLeg)[] {
    return this.#element.nativeElement.legs;
  }

  @Input({ alias: 'disable-animation', transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }

  @Input()
  public set now(value: SbbDateLike | undefined) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): SbbDateLike | undefined {
    return this.#element.nativeElement.now;
  }
}
