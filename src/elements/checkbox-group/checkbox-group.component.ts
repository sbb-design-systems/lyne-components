import type { SbbCheckboxPanelElement } from '../checkbox-panel.ts';
import type { SbbCheckboxElement } from '../checkbox.ts';
import { getNextElementIndex, interactivityChecker, isArrowKeyPressed } from '../core/a11y.ts';
import { SbbSelectionGroupBaseElement } from '../core/base-elements.ts';

/**
 * It can be used as a container for checkbox elements.
 *
 * @slot - Use the unnamed slot to add `sbb-checkbox`, `sbb-checkbox-panel`, `sbb-selection-action-panel`
 * and `sbb-selection-expansion-panel` elements to the `sbb-checkbox-group`.
 * @slot error - Slot used to render a `sbb-error` inside the `sbb-checkbox-group`.
 */
export class SbbCheckboxGroupElement extends SbbSelectionGroupBaseElement<
  SbbCheckboxElement | SbbCheckboxPanelElement
> {
  public static override readonly elementName: string = 'sbb-checkbox-group';
  protected override selectionElementSelectors = 'sbb-checkbox, sbb-checkbox-panel';
  protected override panelElementSelector = 'sbb-checkbox-panel';

  /** List of contained checkbox elements. */
  public get checkboxes(): (SbbCheckboxElement | SbbCheckboxPanelElement)[] {
    return this.selectionElements;
  }

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledCheckboxes: (SbbCheckboxElement | SbbCheckboxPanelElement)[] =
      this.checkboxes.filter(
        (checkbox: SbbCheckboxElement | SbbCheckboxPanelElement) =>
          !checkbox.disabled && interactivityChecker.isVisible(checkbox as HTMLElement),
      );

    if (
      !enabledCheckboxes ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this &&
        (evt.target as HTMLElement).parentElement !== this &&
        (evt.target as HTMLElement).parentElement!.localName !== 'sbb-selection-expansion-panel' &&
        (evt.target as HTMLElement).parentElement!.localName !== 'sbb-selection-action-panel')
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = enabledCheckboxes.findIndex(
        (e: SbbCheckboxElement | SbbCheckboxPanelElement) => e === evt.target,
      );
      const nextIndex: number = getNextElementIndex(evt, current, enabledCheckboxes.length);
      enabledCheckboxes[nextIndex]?.focus();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox-group': SbbCheckboxGroupElement;
  }
}
