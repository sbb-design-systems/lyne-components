import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbTitleBase as SbbTitleBaseElement,
  SbbTitleLevel,
} from '@sbb-esta/lyne-elements/title.js';

import { booleanAttribute, SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

export abstract class SbbTitleBase extends SbbNegativeMixin(HTMLElement) {
  #element = inject(ElementRef<SbbTitleBaseElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  @Input({ alias: 'visual-level' })
  public set visualLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visualLevel = value));
  }
  public get visualLevel(): SbbTitleLevel {
    return this.#element.nativeElement.visualLevel;
  }

  @Input({ alias: 'visually-hidden', transform: booleanAttribute })
  public set visuallyHidden(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visuallyHidden = value));
  }
  public get visuallyHidden(): SbbTitleLevel {
    return this.#element.nativeElement.visuallyHidden;
  }
}
