import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbFileSelectorDropzoneElement } from '@sbb-esta/lyne-elements/file-selector/file-selector-dropzone.js';

import '@sbb-esta/lyne-elements/file-selector/file-selector-dropzone.js';
import { SbbFileSelectorCommonElementMixin } from '@sbb-esta/lyne-angular/file-selector/common/file-selector-common';

@Directive({
  selector: 'sbb-file-selector-dropzone',
  standalone: true,
})
export class SbbFileSelectorDropzone extends SbbFileSelectorCommonElementMixin(HTMLElement) {
  #element = inject(ElementRef<SbbFileSelectorDropzoneElement>);
  #ngZone = inject(NgZone);

  @Input({ alias: 'title-content' })
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }
}
