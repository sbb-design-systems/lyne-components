import { SbbButtonBaseElement } from '../../core.ts';
import { SbbNavigationActionCommonElementMixin } from '../common/navigation-action-common.ts';

/**
 * It displays a button element that can be used in the `sbb-navigation` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-navigation-button`.
 */
export class SbbNavigationButtonElement extends SbbNavigationActionCommonElementMixin(
  SbbButtonBaseElement,
) {
  public static override readonly elementName: string = 'sbb-navigation-button';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-button': SbbNavigationButtonElement;
  }
}
