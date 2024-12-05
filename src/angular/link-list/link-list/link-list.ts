import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbLinkListElement } from '@sbb-esta/lyne-elements/link-list/link-list.js';

import '@sbb-esta/lyne-elements/link-list/link-list.js';
import { SbbLinkListBaseElement } from '@sbb-esta/lyne-angular/link-list/common/link-list-base';

@Directive({
  selector: 'sbb-link-list',
  standalone: true,
})
export class SbbLinkList extends SbbLinkListBaseElement {
  #element = inject(ElementRef<SbbLinkListElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'horizontal-from' })
  public set horizontalFrom(value: SbbHorizontalFrom | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom | null {
    return this.#element.nativeElement.horizontalFrom;
  }

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }
}
