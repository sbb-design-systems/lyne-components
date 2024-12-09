/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbFileSelectorCommonElementMixinType } from '@sbb-esta/lyne-elements/file-selector.js';

import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { Constructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core/mixins/disabled-mixin.js';
import { SbbFormAssociatedMixin } from '@sbb-esta/lyne-angular/core/mixins/form-associated-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFileSelectorCommonElementMixin = <T extends Constructor>(
  superclass: T,
): Constructor<Partial<SbbFileSelectorCommonElementMixinType>> & T => {
  abstract class SbbFileSelectorCommonElement
    extends SbbDisabledMixin(SbbFormAssociatedMixin(superclass))
    implements Partial<SbbFileSelectorCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbFileSelectorCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input()
    public set size(value: 's' | 'm') {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
    }
    public get size(): 's' | 'm' {
      return this.#element.nativeElement.size;
    }

    @Input({ transform: booleanAttribute })
    public set multiple(value: boolean) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
    }
    public get multiple(): boolean {
      return this.#element.nativeElement.multiple;
    }

    @Input({ alias: 'multiple-mode' })
    public set multipleMode(value: 'default' | 'persistent') {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multipleMode = value));
    }
    public get multipleMode(): 'default' | 'persistent' {
      return this.#element.nativeElement.multipleMode;
    }

    @Input()
    public set accept(value: string) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accept = value));
    }
    public get accept(): string {
      return this.#element.nativeElement.accept;
    }

    @Input({ alias: 'accessibility-label' })
    public set accessibilityLabel(value: string) {
      this.#ngZone.runOutsideAngular(
        () => (this.#element.nativeElement.accessibilityLabel = value),
      );
    }
    public get accessibilityLabel(): string {
      return this.#element.nativeElement.accessibilityLabel;
    }

    @Input()
    public override set value(value: string | null) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
    }
    public override get value(): string | null {
      return this.#element.nativeElement.value;
    }

    @Input()
    public set files(value: Readonly<File>[]) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.files = value));
    }
    public get files(): Readonly<File>[] {
      return this.#element.nativeElement.files;
    }

    public override get type(): string {
      return this.#element.nativeElement.type;
    }
  }
  return SbbFileSelectorCommonElement as unknown as Constructor<SbbFileSelectorCommonElementMixinType> &
    T;
};
