import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { SbbHeaderActionCommonElementMixin } from '../common/header-action-common.ts';

/**
 * It displays a button element that can be used in the `sbb-header` component.
 *
 * @slot icon - Slot used to render the button icon.
 * @slot - Use the unnamed slot to add content to the `sbb-header-button`.
 */
export class SbbHeaderButtonElement extends SbbHeaderActionCommonElementMixin(
  SbbButtonBaseElement,
) {
  public static override readonly elementName: string = 'sbb-header-button';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header-button': SbbHeaderButtonElement;
  }
}
