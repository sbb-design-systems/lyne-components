import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  Output,
  inject,
  numberAttribute,
} from '@angular/core';
import type {
  InterfaceSbbTabGroupTab,
  SbbTabChangedEventDetails,
  SbbTabGroupElement,
} from '@sbb-esta/lyne-elements/tabs/tab-group.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/tabs/tab-group.js';

@Directive({
  selector: 'sbb-tab-group',
  standalone: true,
})
export class SbbTabGroup {
  #element = inject(ElementRef<SbbTabGroupElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'initial-selected-index', transform: numberAttribute })
  public set initialSelectedIndex(value: number) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.initialSelectedIndex = value),
    );
  }
  public get initialSelectedIndex(): number {
    return this.#element.nativeElement.initialSelectedIndex;
  }

  @Input()
  public set size(value: InterfaceSbbTabGroupTab['size']) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): InterfaceSbbTabGroupTab['size'] {
    return this.#element.nativeElement.size;
  }

  @Output() public selectedTabChanged: Observable<SbbTabChangedEventDetails> = fromEvent(
    this.#element.nativeElement,
    'selectedTabChanged',
  );

  public disableTab(tabIndex: number): void {
    return this.#element.nativeElement.disableTab(tabIndex);
  }

  public enableTab(tabIndex: number): void {
    return this.#element.nativeElement.enableTab(tabIndex);
  }

  public activateTab(tabIndex: number): void {
    return this.#element.nativeElement.activateTab(tabIndex);
  }
}
