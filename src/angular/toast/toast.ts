import { Directive, ElementRef, Input, NgZone, inject, numberAttribute } from '@angular/core';
import type { SbbToastElement, SbbToastPosition } from '@sbb-esta/lyne-elements/toast.js';
import '@sbb-esta/lyne-elements/toast.js';

import { booleanAttribute, SbbOpenCloseBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-toast',
  standalone: true,
})
export class SbbToast extends SbbIconNameMixin(SbbOpenCloseBaseElement) {
  #element = inject(ElementRef<SbbToastElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: numberAttribute })
  public set timeout(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.timeout = value));
  }
  public get timeout(): number {
    return this.#element.nativeElement.timeout;
  }

  @Input()
  public set position(value: SbbToastPosition) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.position = value));
  }
  public get position(): SbbToastPosition {
    return this.#element.nativeElement.position;
  }

  @Input({ transform: booleanAttribute })
  public set dismissible(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dismissible = value));
  }
  public get dismissible(): boolean {
    return this.#element.nativeElement.dismissible;
  }

  @Input()
  public set politeness(value: 'polite' | 'assertive' | 'off') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.politeness = value));
  }
  public get politeness(): 'polite' | 'assertive' | 'off' {
    return this.#element.nativeElement.politeness;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
