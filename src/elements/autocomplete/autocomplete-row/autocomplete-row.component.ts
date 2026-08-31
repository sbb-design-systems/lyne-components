import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { SbbElement, SbbPropertyWatcherController } from '../../core.ts';

import style from './autocomplete-row.scss?inline';

let autocompleteRowNextId = 0;

/**
 * The component is used as a wrapper for an option and one or more action buttons.
 *
 * @slot - Use the unnamed slot to add a `sbb-option` followed by one or more `sbb-autocomplete-button` elements.
 */
export class SbbAutocompleteRowElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-autocomplete-row';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  public constructor() {
    super();

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-autocomplete'), {
        negative: (e) => this.toggleState('negative', e.negative),
      }),
    );

    this.addController(
      new SbbPropertyWatcherController(this, () => this.querySelector('sbb-option'), {
        disabled: (e) => this.toggleState('disabled', e.disabled),
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-autocomplete-row-${++autocompleteRowNextId}`;
  }

  protected override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-row': SbbAutocompleteRowElement;
  }
}
