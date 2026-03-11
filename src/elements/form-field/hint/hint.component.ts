import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';

import { SbbElement } from '../../core/base-elements.ts';
import { SbbNegativeMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './hint.scss?lit&inline';

/**
 * It displays a hint message in the `sbb-form-field`.
 *
 * @slot - Use this slot to display the hint message.
 */
export class SbbHintElement extends SbbNegativeMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-hint';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'hint';

    const formField = this.closest?.('sbb-form-field');
    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }
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
