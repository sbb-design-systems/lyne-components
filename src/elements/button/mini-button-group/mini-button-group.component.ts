import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import { SbbNamedSlotListMixin, SbbNegativeMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbDividerElement } from '../../divider/divider.component.ts';
import type { SbbMiniButtonElement } from '../mini-button/mini-button.component.ts';

import style from './mini-button-group.scss?lit&inline';

export type SbbMiniButtonGroupSize = 's' | 'm' | 'l' | 'xl';

/**
 * Display a list of `sbb-mini-button` elements in a horizontal container,
 * possibly separated by a `sbb-divider` component.
 *
 * @slot - Use the unnamed slot to add `sbb-mini-button` and `sbb-divider` elements.
 */
export
@customElement('sbb-mini-button-group')
class SbbMiniButtonGroupElement extends SbbNegativeMixin(
  SbbNamedSlotListMixin<SbbMiniButtonElement, typeof LitElement>(LitElement),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  protected override readonly listChildLocalNames = [
    'sbb-mini-button',
    'sbb-mini-button-link',
    'sbb-divider',
  ];

  /** This will be forwarded as aria-label to the list that contains the buttons. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /**
   * Size variant, either s, m, l or xl.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: SbbMiniButtonGroupSize = isLean() ? 's' : 'm';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._proxyNegative();
    }
  }

  private _proxyNegative(): void {
    this.querySelectorAll?.<SbbDividerElement | SbbMiniButtonElement>(
      'sbb-divider, sbb-mini-button, sbb-mini-button-link',
    ).forEach((e) => (e.negative = this.negative));
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderList(
        { ariaLabel: this.accessibilityLabel },
        { localNameVisualOnly: ['sbb-divider'] },
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-button-group': SbbMiniButtonGroupElement;
  }
}
