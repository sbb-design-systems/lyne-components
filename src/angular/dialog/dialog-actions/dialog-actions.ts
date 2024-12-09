import { Directive } from '@angular/core';
import { SbbActionGroupElement } from '@sbb-esta/lyne-elements/action-group/action-group.js';
import '@sbb-esta/lyne-elements/dialog/dialog-actions.js';

@Directive({
  selector: 'sbb-dialog-actions',
  standalone: true,
})
export class SbbDialogActions extends SbbActionGroupElement {}
