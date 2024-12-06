import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbMenuElement } from '@sbb-esta/lyne-elements/menu/menu.js';

import '@sbb-esta/lyne-elements/menu/menu.js';
import { SbbOpenCloseBaseElement } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-menu',
  standalone: true,
})
export class SbbMenu extends SbbOpenCloseBaseElement {
  #element = inject(ElementRef<SbbMenuElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'list-accessibility-label' })
  public set listAccessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.listAccessibilityLabel = value),
    );
  }
  public get listAccessibilityLabel(): string {
    return this.#element.nativeElement.listAccessibilityLabel;
  }

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): string | HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
