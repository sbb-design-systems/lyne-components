import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type { SbbAlertGroupElement } from '@sbb-esta/lyne-elements/alert/alert-group.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/alert/alert-group.js';

@Directive({
  selector: 'sbb-alert-group',
  standalone: true,
})
export class SbbAlertGroup extends HTMLElement {
  #element = inject(ElementRef<SbbAlertGroupElement>);
  #ngZone = inject(NgZone);

  @Input()
  public override set role(value: 'alert' | 'status' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.role = value));
  }
  public override get role(): 'alert' | 'status' | string {
    return this.#element.nativeElement.role;
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

  @Output() public empty: Observable<void> = fromEvent(this.#element.nativeElement, 'empty');
}
