import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/screen-reader-only.js';

@Directive({
  selector: 'sbb-screen-reader-only',
  standalone: true,
})
export class SbbScreenReaderOnly extends HTMLElement {}
