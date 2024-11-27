/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbOpenCloseBaseElement } from '@sbb-esta/lyne-angular/core/base-elements/open-close-base-element';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core/mixins/negative-mixin';

export abstract class SbbAutocompleteBaseElement extends SbbNegativeMixin(SbbOpenCloseBaseElement) {
  #element = inject(ElementRef<SbbAutocompleteBaseElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set origin(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.origin = value));
  }
  public get origin(): string | HTMLElement | null {
    return this.#element.nativeElement.origin;
  }

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): string | HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  @Input({ alias: 'preserve-icon-space', transform: booleanAttribute })
  public set preserveIconSpace(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preserveIconSpace = value));
  }
  public get preserveIconSpace(): boolean {
    return this.#element.nativeElement.preserveIconSpace;
  }

  public get originElement(): HTMLElement {
    return this.#element.nativeElement.originElement;
  }

  public get triggerElement(): HTMLInputElement | undefined {
    return this.#element.nativeElement.triggerElement;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
