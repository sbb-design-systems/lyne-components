import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbFlipCardDetailsElement } from '@sbb-esta/lyne-elements/flip-card/flip-card-details.js';
import type { SbbFlipCardSummaryElement } from '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';
import type { SbbFlipCardElement } from '@sbb-esta/lyne-elements/flip-card/flip-card.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/flip-card/flip-card.js';

@Directive({
  selector: 'sbb-flip-card',
  standalone: true,
})
export class SbbFlipCard {
  #element = inject(ElementRef<SbbFlipCardElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Output() public flip: Observable<void> = fromEvent(this.#element.nativeElement, 'flip');

  public get summary(): SbbFlipCardSummaryElement | null {
    return this.#element.nativeElement.summary;
  }

  public get details(): SbbFlipCardDetailsElement | null {
    return this.#element.nativeElement.details;
  }

  public get isFlipped(): boolean {
    return this.#element.nativeElement.isFlipped;
  }

  public toggle(): void {
    return this.#element.nativeElement.toggle();
  }
}
