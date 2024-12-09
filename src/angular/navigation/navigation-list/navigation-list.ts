import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbNavigationListElement } from '@sbb-esta/lyne-elements/navigation/navigation-list.js';
import '@sbb-esta/lyne-elements/navigation/navigation-list.js';

@Directive({
  selector: 'sbb-navigation-list',
  standalone: true,
})
export class SbbNavigationList {
  #element = inject(ElementRef<SbbNavigationListElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }
}
