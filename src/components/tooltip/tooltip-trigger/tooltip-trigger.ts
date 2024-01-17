import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostContext, isValidAttribute, setAttributes, toggleDatasetEntry } from '../../core/dom';
import { HandlerRepository, actionElementHandlerAspect } from '../../core/eventing';
import { resolveButtonRenderVariables } from '../../core/interfaces';

import style from './tooltip-trigger.scss?lit&inline';
import '../../icon';

/**
 * It can be used as a trigger for the `sbb-tooltip` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-tooltip-trigger`.
 */
@customElement('sbb-tooltip-trigger')
export class SbbTooltipTriggerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name: string | undefined;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName = 'circle-information-small';

  /** Whether the tooltip-trigger is disabled. */
  @property({ reflect: true, type: Boolean }) public disabled: boolean;

  private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
    const formField = hostContext('sbb-form-field', this) ?? hostContext('[data-form-field]', this);

    if (formField) {
      toggleDatasetEntry(this, 'iconSmall', true);
      this.negative = isValidAttribute(formField as HTMLElement, 'negative');
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const { hostAttributes } = resolveButtonRenderVariables(this);

    setAttributes(this, hostAttributes);

    return html`
      <span class="sbb-tooltip-trigger">
        <slot>${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tooltip-trigger': SbbTooltipTriggerElement;
  }
}
