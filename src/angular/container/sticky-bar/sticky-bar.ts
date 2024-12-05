import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbStickyBarElement } from '@sbb-esta/lyne-elements/container/sticky-bar.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/container/sticky-bar.js';

@Directive({
  selector: 'sbb-sticky-bar',
  standalone: true,
})
export class SbbStickyBar {
  #element = inject(ElementRef<SbbStickyBarElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set color(value: 'white' | 'milk' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' | null {
    return this.#element.nativeElement.color;
  }

  @Output() public willStick: Observable<undefined> = fromEvent(
    this.#element.nativeElement,
    'willStick',
  );

  @Output() public didStick: Observable<undefined> = fromEvent(
    this.#element.nativeElement,
    'didStick',
  );

  @Output() public willUnstick: Observable<undefined> = fromEvent(
    this.#element.nativeElement,
    'willUnstick',
  );

  @Output() public didUnstick: Observable<undefined> = fromEvent(
    this.#element.nativeElement,
    'didUnstick',
  );

  public stick(): void {
    return this.#element.nativeElement.stick();
  }

  public unstick(): void {
    return this.#element.nativeElement.unstick();
  }
}
