import { Directive, ElementRef, Input, NgZone, inject, numberAttribute } from '@angular/core';
import type { SbbImageElement } from '@sbb-esta/lyne-elements/image.js';
import '@sbb-esta/lyne-elements/image.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-image',
  standalone: true,
})
export class SbbImage extends HTMLElement {
  #element = inject(ElementRef<SbbImageElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set alt(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alt = value));
  }
  public get alt(): string {
    return this.#element.nativeElement.alt;
  }

  @Input({ alias: 'skip-lqip', transform: booleanAttribute })
  public set skipLqip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.skipLqip = value));
  }
  public get skipLqip(): boolean {
    return this.#element.nativeElement.skipLqip;
  }

  @Input()
  public set caption(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.caption = value));
  }
  public get caption(): string {
    return this.#element.nativeElement.caption;
  }

  @Input()
  public set copyright(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.copyright = value));
  }
  public get copyright(): string {
    return this.#element.nativeElement.copyright;
  }

  @Input({ alias: 'copyright-holder' })
  public set copyrightHolder(value: 'Organization' | 'Person') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.copyrightHolder = value));
  }
  public get copyrightHolder(): 'Organization' | 'Person' {
    return this.#element.nativeElement.copyrightHolder;
  }

  @Input({ alias: 'custom-focal-point', transform: booleanAttribute })
  public set customFocalPoint(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.customFocalPoint = value));
  }
  public get customFocalPoint(): boolean {
    return this.#element.nativeElement.customFocalPoint;
  }

  @Input()
  public set decoding(value: 'sync' | 'async' | 'auto') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.decoding = value));
  }
  public get decoding(): 'sync' | 'async' | 'auto' {
    return this.#element.nativeElement.decoding;
  }

  @Input({ alias: 'focal-point-debug', transform: booleanAttribute })
  public set focalPointDebug(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointDebug = value));
  }
  public get focalPointDebug(): boolean {
    return this.#element.nativeElement.focalPointDebug;
  }

  @Input({ alias: 'focal-point-x', transform: numberAttribute })
  public set focalPointX(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointX = value));
  }
  public get focalPointX(): number {
    return this.#element.nativeElement.focalPointX;
  }

  @Input({ alias: 'focal-point-y', transform: numberAttribute })
  public set focalPointY(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focalPointY = value));
  }
  public get focalPointY(): number {
    return this.#element.nativeElement.focalPointY;
  }

  @Input({ alias: 'image-src' })
  public set imageSrc(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageSrc = value));
  }
  public get imageSrc(): string {
    return this.#element.nativeElement.imageSrc;
  }

  @Input()
  public set importance(value: 'auto' | 'high' | 'low') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.importance = value));
  }
  public get importance(): 'auto' | 'high' | 'low' {
    return this.#element.nativeElement.importance;
  }

  @Input()
  public set loading(value: 'eager' | 'lazy') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loading = value));
  }
  public get loading(): 'eager' | 'lazy' {
    return this.#element.nativeElement.loading;
  }

  @Input({ alias: 'performance-mark' })
  public set performanceMark(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.performanceMark = value));
  }
  public get performanceMark(): string {
    return this.#element.nativeElement.performanceMark;
  }

  @Input({ alias: 'picture-sizes-config' })
  public set pictureSizesConfig(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pictureSizesConfig = value));
  }
  public get pictureSizesConfig(): string {
    return this.#element.nativeElement.pictureSizesConfig;
  }

  @Input({ alias: 'border-radius' })
  public set borderRadius(value: 'default' | 'none' | 'round') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderRadius = value));
  }
  public get borderRadius(): 'default' | 'none' | 'round' {
    return this.#element.nativeElement.borderRadius;
  }

  @Input({ alias: 'aspect-ratio' })
  public set aspectRatio(
    value:
      | 'free'
      | '1-1'
      | '1-2'
      | '2-1'
      | '2-3'
      | '3-2'
      | '3-4'
      | '4-3'
      | '4-5'
      | '5-4'
      | '9-16'
      | '16-9',
  ) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.aspectRatio = value));
  }
  public get aspectRatio():
    | 'free'
    | '1-1'
    | '1-2'
    | '2-1'
    | '2-3'
    | '3-2'
    | '3-4'
    | '4-3'
    | '4-5'
    | '5-4'
    | '9-16'
    | '16-9' {
    return this.#element.nativeElement.aspectRatio;
  }

  public get complete(): boolean {
    return this.#element.nativeElement.complete;
  }
}
