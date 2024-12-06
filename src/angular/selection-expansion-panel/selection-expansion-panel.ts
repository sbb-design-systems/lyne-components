import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbSelectionExpansionPanelElement } from '@sbb-esta/lyne-elements/selection-expansion-panel.js';
import { fromEvent, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/selection-expansion-panel.js';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-selection-expansion-panel',
  standalone: true,
})
export class SbbSelectionExpansionPanel {
  #element = inject(ElementRef<SbbSelectionExpansionPanelElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  @Input({ alias: 'force-open', transform: booleanAttribute })
  public set forceOpen(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.forceOpen = value));
  }
  public get forceOpen(): boolean {
    return this.#element.nativeElement.forceOpen;
  }

  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  @Output() public willOpen: Observable<void> = fromEvent(this.#element.nativeElement, 'willOpen');

  @Output() public didOpen: Observable<void> = fromEvent(this.#element.nativeElement, 'didOpen');

  @Output() public willClose: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'willClose',
  );

  @Output() public didClose: Observable<void> = fromEvent(this.#element.nativeElement, 'didClose');
}
