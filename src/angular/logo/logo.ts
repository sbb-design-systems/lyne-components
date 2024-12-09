import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbProtectiveRoom } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbLogoElement } from '@sbb-esta/lyne-elements/logo.js';
import '@sbb-esta/lyne-elements/logo.js';

import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-logo',
  standalone: true,
})
export class SbbLogo extends SbbNegativeMixin(HTMLElement) {
  #element = inject(ElementRef<SbbLogoElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'protective-room' })
  public set protectiveRoom(value: SbbProtectiveRoom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.protectiveRoom = value));
  }
  public get protectiveRoom(): SbbProtectiveRoom {
    return this.#element.nativeElement.protectiveRoom;
  }

  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }
}
