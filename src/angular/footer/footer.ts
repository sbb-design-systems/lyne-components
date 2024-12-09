import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbFooterElement } from '@sbb-esta/lyne-elements/footer.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/footer.js';

import { booleanAttribute, SbbNegativeMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-footer',
  standalone: true,
})
export class SbbFooter extends SbbNegativeMixin(HTMLElement) {
  #element = inject(ElementRef<SbbFooterElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set variant(value: 'default' | 'clock-columns') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.variant = value));
  }
  public get variant(): 'default' | 'clock-columns' {
    return this.#element.nativeElement.variant;
  }

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  @Input({ alias: 'accessibility-title' })
  public set accessibilityTitle(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityTitle = value));
  }
  public get accessibilityTitle(): string {
    return this.#element.nativeElement.accessibilityTitle;
  }

  @Input({ alias: 'accessibility-title-level' })
  public set accessibilityTitleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityTitleLevel = value),
    );
  }
  public get accessibilityTitleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.accessibilityTitleLevel;
  }
}
