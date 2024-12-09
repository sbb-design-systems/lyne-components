import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbOverlayElement } from '@sbb-esta/lyne-elements/overlay.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/overlay.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbOverlayBaseElement } from '@sbb-esta/lyne-angular/overlay/overlay-base-element.js';

@Directive({
  selector: 'sbb-overlay',
  standalone: true,
})
export class SbbOverlay extends SbbOverlayBaseElement {
  #element = inject(ElementRef<SbbOverlayElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  @Input({ alias: 'back-button', transform: booleanAttribute })
  public set backButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backButton = value));
  }
  public get backButton(): boolean {
    return this.#element.nativeElement.backButton;
  }

  @Input({ alias: 'accessibility-close-label' })
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
  }

  @Input({ alias: 'accessibility-back-label' })
  public set accessibilityBackLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityBackLabel = value),
    );
  }
  public get accessibilityBackLabel(): string {
    return this.#element.nativeElement.accessibilityBackLabel;
  }

  @Output() public backClick: Observable<any> = fromEvent(this.#element.nativeElement, 'backClick');

  public open(): void {
    return this.#element.nativeElement.open();
  }
}
