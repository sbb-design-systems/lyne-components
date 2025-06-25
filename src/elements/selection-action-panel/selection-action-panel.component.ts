import { type CSSResultGroup, html, isServer, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbCheckboxGroupElement, SbbCheckboxPanelElement } from '../checkbox.js';
import { forceType } from '../core/decorators.js';
import type { SbbStateChange } from '../core/interfaces.js';
import { SbbHydrationMixin } from '../core/mixins.js';
import type { SbbRadioButtonGroupElement, SbbRadioButtonPanelElement } from '../radio-button.js';

import style from './selection-action-panel.scss?lit&inline';

import '../divider.js';

/**
 * It displays a panel connected to a `sbb-checkbox` or to a `sbb-radio-button`.
 * Can also contain an action element (e.g. an `sbb-button`)
 *
 * @slot - Use this slot to render a `sbb-checkbox-panel` or `sbb-radio-button-panel` element and the action element.
 * @slot badge - Use this slot to render a `sbb-card-badge` component.
 */
export
@customElement('sbb-selection-action-panel')
class SbbSelectionActionPanelElement extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** The background color of the panel. */
  @property({ reflect: true }) public accessor color: 'white' | 'milk' = 'white';

  /** Whether the unselected panel has a border. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor borderless: boolean = false;

  /** Whether the selection panel is checked. */
  private set _checked(checked: boolean) {
    this.toggleAttribute('data-checked', checked);
  }
  private get _checked(): boolean {
    return this.hasAttribute('data-checked');
  }

  /** Whether the selection panel is disabled. */
  private set _disabled(disabled: boolean) {
    this.toggleAttribute('data-disabled', disabled);
  }

  private _sizeAttributeObserver = !isServer
    ? new MutationObserver((mutationsList: MutationRecord[]) =>
        this._onSizeAttributesChange(mutationsList),
      )
    : null;

  private get _group(): SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null {
    return this.closest('sbb-radio-button-group, sbb-checkbox-group') as
      | SbbRadioButtonGroupElement
      | SbbCheckboxGroupElement;
  }

  public constructor() {
    super();
    this.addEventListener?.('panelconnected', (e) => this._initFromInput(e));
    this.addEventListener?.('statechange', (e) => this._onInputStateChange(e));
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._sizeAttributeObserver?.disconnect();
  }

  private _initFromInput(event: Event): void {
    const input = event.target as SbbCheckboxPanelElement | SbbRadioButtonPanelElement;

    this._checked = input.checked;
    this._disabled = input.disabled;
    this._sizeAttributeObserver?.disconnect();
    // The size of the inner panel can change due direct change on the panel or due to change of the input-group size.
    this._sizeAttributeObserver?.observe(input, { attributeFilter: ['size'] });
  }

  /**
   * Set the data-size in two cases:
   * - if there's no group, so the size change comes directly from a change on the inner panel;
   * - if there's a wrapper group and its size changes, syncing it with the panel size.
   *
   * On the other hand, if there's a wrapper group and the size changes on the inner panel, the data-size doesn't change.
   */
  private _onSizeAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'size') {
        const group = this._group;
        const size = (mutation.target as HTMLElement).getAttribute('size')!;
        if (!group || group.size === size) {
          this.setAttribute('data-size', size);
        }
      }
    }
  }

  private _onInputStateChange(event: CustomEvent<SbbStateChange>): void {
    if (event.detail.type === 'disabled') {
      this._disabled = event.detail.disabled;
      return;
    } else if (event.detail.type !== 'checked') {
      return;
    }

    this._checked = event.detail.checked;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-selection-action-panel__wrapper">
        <div class="sbb-selection-action-panel__badge">
          <slot name="badge"></slot>
        </div>
        <div class="sbb-selection-action-panel">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-selection-action-panel': SbbSelectionActionPanelElement;
  }
}
