import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbStatusElement, SbbStatusType } from '@sbb-esta/lyne-elements/status.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/status.js';

import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-status',
  standalone: true,
})
export class SbbStatus extends SbbIconNameMixin(HTMLElement) {
  #element = inject(ElementRef<SbbStatusElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set type(value: SbbStatusType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbStatusType {
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
}
