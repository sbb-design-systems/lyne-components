import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/dialog/dialog-actions.js';
import { SbbActionGroupElement } from '@sbb-esta/lyne-elements/action-group/action-group';

@Directive({
  selector: 'sbb-dialog-actions',
  standalone: true,
})
export class SbbDialogActions extends SbbActionGroupElement {}
