/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import type { SbbOverlayCloseEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';

import { SbbOpenCloseBaseElement } from '@sbb-esta/lyne-angular/core/base-elements/open-close-base-element';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core/mixins/negative-mixin';

export abstract class SbbOverlayBaseElement extends SbbNegativeMixin(
  SbbOpenCloseBaseElement<SbbOverlayCloseEventDetails>,
) {
  #element = inject(ElementRef<SbbOverlayBaseElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Output() public override didClose: Observable<SbbOverlayCloseEventDetails> = fromEvent(
    this.#element.nativeElement,
    'didClose',
  );

  public close(result?: any, target?: HTMLElement): any {
    return this.#element.nativeElement.close(result, target);
  }
}
