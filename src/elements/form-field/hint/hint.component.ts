import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { html } from 'lit';

import { boxSizingStyles, SbbElement, SbbNegativeMixin } from '../../core.ts';
import type { SbbFormFieldElement } from '../form-field/form-field.component.ts';

import style from './hint.scss?inline';

/**
 * It displays a hint message in the `sbb-form-field`.
 *
 * @slot - Use the unnamed slot to display the hint message.
 */
export class SbbHintElement extends SbbNegativeMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-hint';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  protected formField: SbbFormFieldElement | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'hint';

    this.formField = this.closest?.('sbb-form-field');
    this.negative = this.formField?.hasAttribute('negative') ?? false;
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-hint': SbbHintElement;
  }
}
