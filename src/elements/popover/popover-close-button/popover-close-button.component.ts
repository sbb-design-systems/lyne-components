import { type TemplateResult } from 'lit';

import { SbbSecondaryButtonElement } from '../../button.pure.ts';
import { i18nClosePopover, SbbLanguageController } from '../../core.ts';

/**
 * Popover close button, intended to be placed inside sbb-popover.
 *
 * @slot - Use the unnamed slot to add content to the popover-close-button. Not intended to be used in this context.
 * @slot icon - Slot used to display the icon, if one is set. Not intended to be used in this context.
 */
export class SbbPopoverCloseButtonElement extends SbbSecondaryButtonElement {
  public static override readonly elementName: string = 'sbb-popover-close-button';

  private _languageController = new SbbLanguageController(this).withHandler(
    () => (this.internals.ariaLabel = i18nClosePopover[this._languageController.current]),
  );

  public constructor() {
    super();
    this.size = 's' as this['size'];
  }

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }

  protected override renderIconName(): string {
    return super.renderIconName() || 'cross-small';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-popover-close-button': SbbPopoverCloseButtonElement;
  }
}
