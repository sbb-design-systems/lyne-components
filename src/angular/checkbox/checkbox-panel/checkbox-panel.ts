import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import type {
  SbbCheckboxPanelElement,
  SbbCheckboxPanelStateChange,
} from '@sbb-esta/lyne-elements/checkbox/checkbox-panel.js';
import type { SbbPanelSize } from '@sbb-esta/lyne-elements/core/mixins.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/checkbox/checkbox-panel.js';

import { SbbCheckboxCommonElementMixin } from '@sbb-esta/lyne-angular/checkbox/common/checkbox-common.js';
import { SbbPanelMixin } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-checkbox-panel',
  standalone: true,
})
export class SbbCheckboxPanel extends SbbPanelMixin(SbbCheckboxCommonElementMixin(HTMLElement)) {
  #element = inject(ElementRef<SbbCheckboxPanelElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set size(value: SbbPanelSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbPanelSize {
    return this.#element.nativeElement.size;
  }

  @Output() public stateChange: Observable<SbbCheckboxPanelStateChange> = fromEvent(
    this.#element.nativeElement,
    'stateChange',
  );
}
