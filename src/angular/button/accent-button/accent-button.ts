import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/button/accent-button.js';


@Directive({
  selector: 'sbb-accent-button',
  standalone: true,
})
export class SbbAccentButton extends SbbButtonCommonElementMixin(SbbDisabledTabIndexActionMixin(SbbButtonBaseElement)) {
}