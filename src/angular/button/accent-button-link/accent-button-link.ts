import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/button/accent-button-link.js';


@Directive({
  selector: 'sbb-accent-button-link',
  standalone: true,
})
export class SbbAccentButtonLink extends SbbButtonCommonElementMixin(SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbLinkBaseElement))) {
}