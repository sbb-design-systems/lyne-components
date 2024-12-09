import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbAlertElement } from '@sbb-esta/lyne-elements/alert/alert.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/alert/alert.js';

import { booleanAttribute, SbbOpenCloseBaseElement } from '@sbb-esta/lyne-angular/core';
import { SbbIconNameMixin } from '@sbb-esta/lyne-angular/icon/icon-name-mixin.js';

@Directive({
  selector: 'sbb-alert',
  standalone: true,
})
export class SbbAlert extends SbbIconNameMixin(SbbOpenCloseBaseElement) {
  #element = inject(ElementRef<SbbAlertElement>);
  #ngZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set readonly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readonly = value));
  }
  public get readonly(): boolean {
    return this.#element.nativeElement.readonly;
  }

  @Input()
  public set size(value: 's' | 'm' | 'l') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' | 'l' {
    return this.#element.nativeElement.size;
  }

  @Input({ alias: 'icon-name' })
  public override set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public override get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Input({ alias: 'title-content' })
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  @Input({ alias: 'title-level' })
  public set titleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.titleLevel;
  }

  @Input()
  public set animation(value: 'open' | 'close' | 'all' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.animation = value));
  }
  public get animation(): 'open' | 'close' | 'all' | 'none' {
    return this.#element.nativeElement.animation;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
