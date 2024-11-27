/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core/mixins/negative-mixin';

export class SbbLinkListBaseElement extends SbbNegativeMixin(HTMLElement) {
  #element = inject(ElementRef<SbbLinkListBaseElement>);
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

  @Input()
  public set size(value: SbbLinkSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbLinkSize {
    return this.#element.nativeElement.size;
  }
}
