import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbMessageElement } from '@sbb-esta/lyne-elements/message.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/message.js';

@Directive({
  selector: 'sbb-message',
  standalone: true,
})
export class SbbMessage extends HTMLElement {
  #element = inject(ElementRef<SbbMessageElement>);
  #ngZone = inject(NgZone);

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
}
