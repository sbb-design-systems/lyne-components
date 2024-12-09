import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/flip-card/flip-card-details.js';

@Directive({
  selector: 'sbb-flip-card-details',
  standalone: true,
})
export class SbbFlipCardDetails extends HTMLElement {}
