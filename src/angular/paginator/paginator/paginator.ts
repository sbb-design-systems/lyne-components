import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbPaginatorElement } from '@sbb-esta/lyne-elements/paginator/paginator.js';

import '@sbb-esta/lyne-elements/paginator/paginator.js';
import { SbbPaginatorCommonElementMixin } from '@sbb-esta/lyne-angular/paginator/common/paginator-common.js';

@Directive({
  selector: 'sbb-paginator',
  standalone: true,
})
export class SbbPaginator extends SbbPaginatorCommonElementMixin(HTMLElement) {
  #element = inject(ElementRef<SbbPaginatorElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'page-size-options' })
  public set pageSizeOptions(value: number[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pageSizeOptions = value));
  }
  public get pageSizeOptions(): number[] {
    return this.#element.nativeElement.pageSizeOptions;
  }

  @Input({ alias: 'pager-position' })
  public override set pagerPosition(value: 'start' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.pagerPosition = value));
  }
  public override get pagerPosition(): 'start' | 'end' {
    return this.#element.nativeElement.pagerPosition;
  }
}
