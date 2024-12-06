import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbTagGroupElement } from '@sbb-esta/lyne-elements/tag/tag-group.js';
import '@sbb-esta/lyne-elements/tag/tag-group.js';
import type { SbbTagElement, SbbTagSize } from '@sbb-esta/lyne-elements/tag.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-tag-group',
  standalone: true,
})
export class SbbTagGroup {
  #element = inject(ElementRef<SbbTagGroupElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'list-accessibility-label' })
  public set listAccessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.listAccessibilityLabel = value),
    );
  }
  public get listAccessibilityLabel(): string {
    return this.#element.nativeElement.listAccessibilityLabel;
  }

  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  @Input()
  public set size(value: SbbTagSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbTagSize {
    return this.#element.nativeElement.size;
  }

  public get value(): string | (string | null)[] | null {
    return this.#element.nativeElement.value;
  }

  public get tags(): SbbTagElement[] {
    return this.#element.nativeElement.tags;
  }
}
