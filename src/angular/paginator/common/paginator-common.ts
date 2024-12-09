/* eslint-disable lyne/angular-generator-rule */
import { ElementRef, inject, Input, NgZone, numberAttribute, Output } from '@angular/core';
import type { SbbPaginatorPageEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbPaginatorCommonElementMixinType } from '@sbb-esta/lyne-elements/paginator.js';
import { fromEvent, type Observable } from 'rxjs';

import type { AbstractConstructor } from '@sbb-esta/lyne-angular/core/mixins/constructor.js';
import { SbbDisabledMixin } from '@sbb-esta/lyne-angular/core/mixins/disabled-mixin.js';
import { SbbNegativeMixin } from '@sbb-esta/lyne-angular/core/mixins/negative-mixin.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbPaginatorCommonElementMixin = <T extends AbstractConstructor>(
  superClass: T,
): AbstractConstructor<Partial<SbbPaginatorCommonElementMixinType>> & T => {
  abstract class SbbPaginatorCommonElement
    extends SbbNegativeMixin(SbbDisabledMixin(superClass))
    implements Partial<SbbPaginatorCommonElementMixinType>
  {
    #element = inject(ElementRef<ReturnType<typeof SbbPaginatorCommonElementMixin>>);
    #ngZone = inject(NgZone);

    @Input({ transform: numberAttribute })
    public set length(value: number) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.length = value));
    }
    public get length(): number {
      return this.#element.nativeElement.length;
    }

    @Input({ alias: 'page-size', transform: numberAttribute })
    public set pageSize(value: number) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageSize = value));
    }
    public get pageSize(): number {
      return this.#element.nativeElement.pageSize;
    }

    @Input({ alias: 'page-index', transform: numberAttribute })
    public set pageIndex(value: number) {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageIndex = value));
    }
    public get pageIndex(): number {
      return this.#element.nativeElement.pageIndex;
    }

    @Input({ alias: 'pager-position' })
    public set pagerPosition(value: 'start' | 'end') {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pagerPosition = value));
    }
    public get pagerPosition(): 'start' | 'end' {
      return this.#element.nativeElement.pagerPosition;
    }

    @Input()
    public set size(value: 'm' | 's') {
      this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
    }
    public get size(): 'm' | 's' {
      return this.#element.nativeElement.size;
    }

    @Output() public page: Observable<SbbPaginatorPageEventDetails> = fromEvent(
      this.#element.nativeElement,
      'page',
    );
  }
  return SbbPaginatorCommonElement as unknown as AbstractConstructor<SbbPaginatorCommonElementMixinType> &
    T;
};
