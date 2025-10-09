import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSecondaryButtonElement } from '../../button/secondary-button.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { boxSizingStyles } from '../../core/host.js';
import { i18nCloseSidebar } from '../../core/i18n.js';

import style from './sidebar-close-button.scss?lit&inline';

/**
 * Sidebar close button, intended to be placed inside sbb-sidebar.
 *
 * @slot - Use the unnamed slot to add content to the sidebar-close-button. Not intended to be used in this context.
 * @slot icon - Slot used to display the icon, if one is set. Not intended to be used in this context.
 */
export
@customElement('sbb-sidebar-close-button')
class SbbSidebarCloseButtonElement extends SbbSecondaryButtonElement {
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    SbbSecondaryButtonElement.styles,
    style,
  ];

  private _languageController = new SbbLanguageController(this);

  public constructor() {
    super();
    this.iconName = 'cross-small';
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
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-close-button': SbbSidebarCloseButtonElement;
  }
}
