import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical.js';

@Directive({
  selector: 'sbb-pearl-chain-vertical',
  standalone: true,
})
export class SbbPearlChainVertical extends HTMLElement {}
