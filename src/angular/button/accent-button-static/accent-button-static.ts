import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/button/accent-button-static.js';


@Directive({
  selector: 'sbb-accent-button-static',
  standalone: true,
})
export class SbbAccentButtonStatic extends SbbButtonCommonElementMixin(SbbDisabledMixin(SbbActionBaseElement)) {
}