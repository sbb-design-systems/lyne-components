import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { Breakpoint } from '@sbb-esta/lyne-elements/core/dom.js';
import type { SbbDialogTitleElement } from '@sbb-esta/lyne-elements/dialog/dialog-title.js';
import { SbbTitleBase } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/dialog/dialog-title.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-dialog-title',
  standalone: true,
})
export class SbbDialogTitle extends SbbTitleBase {
  #element = inject(ElementRef<SbbDialogTitleElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'back-button', transform: booleanAttribute })
  public set backButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backButton = value));
  }
  public get backButton(): boolean {
    return this.#element.nativeElement.backButton;
  }

  @Input({ alias: 'accessibility-close-label' })
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
  }

  @Input({ alias: 'accessibility-back-label' })
  public set accessibilityBackLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityBackLabel = value),
    );
  }
  public get accessibilityBackLabel(): string {
    return this.#element.nativeElement.accessibilityBackLabel;
  }

  @Input({ alias: 'hide-on-scroll' })
  public set hideOnScroll(value: '' | Breakpoint | boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideOnScroll = value));
  }
  public get hideOnScroll(): '' | Breakpoint | boolean {
    return this.#element.nativeElement.hideOnScroll;
  }

  @Output() public backClick: Observable<any> = fromEvent(this.#element.nativeElement, 'backClick');
}
