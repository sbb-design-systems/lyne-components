import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { LinkTargetType } from '@sbb-esta/lyne-elements/core/base-elements.js';

import { booleanAttribute } from '../attribute-transform.js';

export abstract class SbbLinkBaseElement {
  #element = inject(ElementRef<SbbLinkBaseElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set href(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.href = value));
  }
  public get href(): string {
    return this.#element.nativeElement.href;
  }

  @Input()
  public set target(value: LinkTargetType | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.target = value));
  }
  public get target(): LinkTargetType | string {
    return this.#element.nativeElement.target;
  }

  @Input()
  public set rel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.rel = value));
  }
  public get rel(): string {
    return this.#element.nativeElement.rel;
  }

  @Input({ transform: booleanAttribute })
  public set download(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.download = value));
  }
  public get download(): string {
    return this.#element.nativeElement.download;
  }

  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }
}
