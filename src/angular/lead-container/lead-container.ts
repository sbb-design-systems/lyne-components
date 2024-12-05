import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/lead-container.js';

@Directive({
  selector: 'sbb-lead-container',
  standalone: true,
})
export class SbbLeadContainer extends HTMLElement {}
