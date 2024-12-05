import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import '@sbb-esta/lyne-elements/navigation/navigation-marker.js';
import type { SbbNavigationButtonElement } from '@sbb-esta/lyne-elements/navigation/navigation-button.js';
import type { SbbNavigationLinkElement } from '@sbb-esta/lyne-elements/navigation/navigation-link.js';
import type { SbbNavigationMarkerElement } from '@sbb-esta/lyne-elements/navigation/navigation-marker.js';

@Directive({
  selector: 'sbb-navigation-marker',
  standalone: true,
})
export class SbbNavigationMarker {
  #element = inject(ElementRef<SbbNavigationMarkerElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: 'l' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'l' | 's' {
    return this.#element.nativeElement.size;
  }

  public select(action: SbbNavigationButtonElement | SbbNavigationLinkElement): void {
    return this.#element.nativeElement.select(action);
  }

  public reset(): void {
    return this.#element.nativeElement.reset();
  }
}
