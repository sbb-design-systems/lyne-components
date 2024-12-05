import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbNotificationElement } from '@sbb-esta/lyne-elements/notification.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/notification.js';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-notification',
  standalone: true,
})
export class SbbNotification extends HTMLElement {
  #element = inject(ElementRef<SbbNotificationElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set type(value: 'info' | 'success' | 'warn' | 'error') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): 'info' | 'success' | 'warn' | 'error' {
    return this.#element.nativeElement.type;
  }

  @Input({ alias: 'title-content' })
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  @Input({ alias: 'title-level' })
  public set titleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.titleLevel;
  }

  @Input({ transform: booleanAttribute })
  public set readonly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readonly = value));
  }
  public get readonly(): boolean {
    return this.#element.nativeElement.readonly;
  }

  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set animation(value: 'open' | 'close' | 'all' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.animation = value));
  }
  public get animation(): 'open' | 'close' | 'all' | 'none' {
    return this.#element.nativeElement.animation;
  }

  @Output() public willOpen: Observable<void> = fromEvent(this.#element.nativeElement, 'willOpen');

  @Output() public didOpen: Observable<void> = fromEvent(this.#element.nativeElement, 'didOpen');

  @Output() public willClose: Observable<void> = fromEvent(
    this.#element.nativeElement,
    'willClose',
  );

  @Output() public didClose: Observable<void> = fromEvent(this.#element.nativeElement, 'didClose');

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
