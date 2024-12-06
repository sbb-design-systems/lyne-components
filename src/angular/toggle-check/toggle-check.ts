import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbToggleCheckElement } from '@sbb-esta/lyne-elements/toggle-check.js';

import '@sbb-esta/lyne-elements/toggle-check.js';
import { SbbFormAssociatedCheckboxMixin } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin';

@Directive({
  selector: 'sbb-toggle-check',
  standalone: true,
})
export class SbbToggleCheck extends SbbFormAssociatedCheckboxMixin(SbbIconNameMixin(HTMLElement)) {
  #element = inject(ElementRef<SbbToggleCheckElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: 'xs' | 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xs' | 's' | 'm' {
    return this.#element.nativeElement.size;
  }

  @Input({ alias: 'icon-name' })
  public override set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public override get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Input({ alias: 'label-position' })
  public set labelPosition(value: 'before' | 'after') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.labelPosition = value));
  }
  public get labelPosition(): 'before' | 'after' {
    return this.#element.nativeElement.labelPosition;
  }
}
