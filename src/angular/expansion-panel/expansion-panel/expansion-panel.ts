import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbExpansionPanelElement } from '@sbb-esta/lyne-elements/expansion-panel/expansion-panel.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/expansion-panel/expansion-panel.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-expansion-panel',
  standalone: true,
})
export class SbbExpansionPanel {
  #element = inject(ElementRef<SbbExpansionPanelElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'title-level' })
  public set titleLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.titleLevel;
  }

  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  @Input()
  public set size(value: 's' | 'l') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Output() public willOpen: Observable<void> = fromEvent(this.#element.nativeElement, 'willOpen');

  @Output() public didOpen: Observable<void> = fromEvent(this.#element.nativeElement, 'didOpen');

  @Output() public willClose: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'willClose',
  );

  @Output() public didClose: Observable<void> = fromEvent(this.#element.nativeElement, 'didClose');
}
