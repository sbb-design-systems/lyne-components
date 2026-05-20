import { type CSSResultGroup, type PropertyValues, type TemplateResult, unsafeCSS } from 'lit';

import { SbbSecondaryButtonElement } from '../../button.pure.ts';
import { i18nClosePopover, SbbLanguageController } from '../../core.ts';

import style from './popover-close-button.scss?inline';

/**
 * Popover close button, intended to be placed inside sbb-popover.
 *
 * @slot - Use the unnamed slot to add content to the popover-close-button. Not intended to be used in this context.
 * @slot icon - Slot used to display the icon, if one is set. Not intended to be used in this context.
 */
export class SbbPopoverCloseButtonElement extends SbbSecondaryButtonElement {
  public static override readonly elementName: string = 'sbb-popover-close-button';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  private _languageController = new SbbLanguageController(this);

  public constructor() {
    super();
    this.size = 's' as this['size'];
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this.slot ||= 'close-button';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.internals.ariaLabel = i18nClosePopover[this._languageController.current];
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
