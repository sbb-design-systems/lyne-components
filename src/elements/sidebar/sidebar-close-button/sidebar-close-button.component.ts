import { unsafeCSS, type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';

import { SbbSecondaryButtonElement } from '../../button.pure.ts';
import { SbbLanguageController, i18nCloseSidebar } from '../../core.ts';

import style from './sidebar-close-button.scss?inline';

/**
 * Sidebar close button, intended to be placed inside sbb-sidebar.
 *
 * @slot - Use the unnamed slot to add content to the sidebar-close-button. Not intended to be used in this context.
 * @slot icon - Slot used to display the icon, if one is set. Not intended to be used in this context.
 */
export class SbbSidebarCloseButtonElement extends SbbSecondaryButtonElement {
  public static override readonly elementName: string = 'sbb-sidebar-close-button';
  public static override styles: CSSResultGroup = [
    SbbSecondaryButtonElement.styles,
    unsafeCSS(style),
  ];

  private _languageController = new SbbLanguageController(this);

  public constructor() {
    super();
    this.size = 's' as this['size'];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'title-section';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.internals.ariaLabel = i18nCloseSidebar[this._languageController.current];
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
    'sbb-sidebar-close-button': SbbSidebarCloseButtonElement;
  }
}
