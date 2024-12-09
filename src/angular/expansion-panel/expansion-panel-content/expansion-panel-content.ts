import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/expansion-panel/expansion-panel-content.js';

@Directive({
  selector: 'sbb-expansion-panel-content',
  standalone: true,
})
export class SbbExpansionPanelContent extends HTMLElement {}
