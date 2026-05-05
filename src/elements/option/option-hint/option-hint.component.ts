import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import type { SbbAutocompleteBaseElement } from '../../autocomplete.pure.ts';
import { SbbElement, SbbNegativeMixin, SbbPropertyWatcherController } from '../../core.ts';
import type { SbbSelectElement } from '../../select.pure.ts';

import style from './option-hint.scss?inline';

/**
 * Display a textual hint inside a `sbb-autocomplete` or a `sbb-select`.
 *
 * @slot - Use the unnamed slot to display the hint message.
 */
export class SbbOptionHintElement extends SbbNegativeMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-option-hint';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  private _previousSize: string | undefined;

  public constructor() {
    super();

    this.addController(
      new SbbPropertyWatcherController<SbbAutocompleteBaseElement | SbbSelectElement>(
        this,
        () => this.closest('sbb-autocomplete, sbb-autocomplete-grid, sbb-select'),
        {
          size: (e) => {
            if (this._previousSize) {
              this.internals.states.delete(`size-${this._previousSize}`);
            }
            this._previousSize = e.size;
            if (this._previousSize) {
              this.internals.states.add(`size-${this._previousSize}`);
            }
          },
        },
      ),
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-optgroup__icon-space"></div>
      <span class="sbb-option-hint">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-option-hint': SbbOptionHintElement;
  }
}
