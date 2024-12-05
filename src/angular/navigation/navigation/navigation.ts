import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbNavigationElement } from '@sbb-esta/lyne-elements/navigation/navigation.js';
import '@sbb-esta/lyne-elements/navigation/navigation.js';

@Directive({
  selector: 'sbb-navigation',
  standalone: true,
})
export class SbbNavigation extends SbbOpenCloseBaseElement {
  #element = inject(ElementRef<SbbNavigationElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'accessibility-close-label' })
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
  }

  public get trigger(): string | HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  public get activeNavigationSection(): HTMLElement | null {
    return this.#element.nativeElement.activeNavigationSection;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
