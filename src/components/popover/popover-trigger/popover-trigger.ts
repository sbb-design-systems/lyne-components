import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  resolveButtonRenderVariables,
  SbbDisabledMixin,
  SbbNegativeMixin,
} from '../../core/common-behaviors';
import { hostContext, isValidAttribute, setAttributes, toggleDatasetEntry } from '../../core/dom';
import { HandlerRepository, actionElementHandlerAspect } from '../../core/eventing';

import style from './popover-trigger.scss?lit&inline';
import '../../icon';

/**
 * It can be used as a trigger for the `sbb-popover` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-popover-trigger`.
 */
@customElement('sbb-popover-trigger')
export class SbbPopoverTriggerElement extends SbbDisabledMixin(SbbNegativeMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name: string | undefined;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName = 'circle-information-small';

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
    setAttributes(this, resolveButtonRenderVariables(this.disabled));

    return html`
      <span class="sbb-popover-trigger">
        <slot>${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-popover-trigger': SbbPopoverTriggerElement;
  }
}
