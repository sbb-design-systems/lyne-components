import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbTeaserHeroElement } from '@sbb-esta/lyne-elements/teaser-hero.js';
import '@sbb-esta/lyne-elements/teaser-hero.js';

import { SbbLinkBaseElement } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-teaser-hero',
  standalone: true,
})
export class SbbTeaserHero extends SbbLinkBaseElement {
  #element = inject(ElementRef<SbbTeaserHeroElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'link-content' })
  public set linkContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.linkContent = value));
  }
  public get linkContent(): string {
    return this.#element.nativeElement.linkContent;
  }

  @Input({ alias: 'image-src' })
  public set imageSrc(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageSrc = value));
  }
  public get imageSrc(): string {
    return this.#element.nativeElement.imageSrc;
  }

  @Input({ alias: 'image-alt' })
  public set imageAlt(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageAlt = value));
  }
  public get imageAlt(): string {
    return this.#element.nativeElement.imageAlt;
  }
}
