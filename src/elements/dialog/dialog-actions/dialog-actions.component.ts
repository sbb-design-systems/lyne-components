import type { CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbActionGroupElement } from '../../action-group.js';
import { isLean } from '../../core/dom/lean-context.js';

import style from './dialog-actions.scss?lit&inline';

/**
 * Use this component to display a footer into an `sbb-dialog` with an action group.
 *
 * @slot - Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-dialog-actions`.
 */
export
@customElement('sbb-dialog-actions')
class SbbDialogActionsElement extends SbbActionGroupElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, SbbActionGroupElement.styles, style];

  public constructor() {
    super();
    /** @default 'm' / 's' (lean) */
    this.buttonSize = isLean() ? 's' : 'm';

    /** @default 's' / 'xs' (lean) */
    this.linkSize = isLean() ? 'xs' : 's';
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'actions';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-dialog-actions': SbbDialogActionsElement;
  }
}
