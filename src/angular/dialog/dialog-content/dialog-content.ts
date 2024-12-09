import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/dialog/dialog-content.js';

@Directive({
  selector: 'sbb-dialog-content',
  standalone: true,
})
export class SbbDialogContent extends HTMLElement {}
