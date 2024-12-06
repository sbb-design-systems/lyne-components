import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbTeaserElement } from '@sbb-esta/lyne-elements/teaser.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/teaser.js';
import { SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-teaser',
  standalone: true,
})
export class SbbTeaser extends SbbLinkBaseElement {
  #element = inject(ElementRef<SbbTeaserElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set alignment(value: 'after-centered' | 'after' | 'below') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignment = value));
  }
  public get alignment(): 'after-centered' | 'after' | 'below' {
    return this.#element.nativeElement.alignment;
  }

  @Input({ alias: 'title-level' })
  public set titleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.titleLevel;
  }

  @Input({ alias: 'title-content' })
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  @Input({ alias: 'chip-content' })
  public set chipContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.chipContent = value));
  }
  public get chipContent(): string {
    return this.#element.nativeElement.chipContent;
  }
}
