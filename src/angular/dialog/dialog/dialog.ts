import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbDialogElement } from '@sbb-esta/lyne-elements/dialog/dialog.js';
import '@sbb-esta/lyne-elements/dialog/dialog.js';

import { SbbOverlayBaseElement } from '@sbb-esta/lyne-angular/overlay/overlay-base-element.js';

@Directive({
  selector: 'sbb-dialog',
  standalone: true,
})
export class SbbDialog extends SbbOverlayBaseElement {
  #element = inject(ElementRef<SbbDialogElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'backdrop-action' })
  public set backdropAction(value: 'close' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backdropAction = value));
  }
  public get backdropAction(): 'close' | 'none' {
    return this.#element.nativeElement.backdropAction;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }
}
