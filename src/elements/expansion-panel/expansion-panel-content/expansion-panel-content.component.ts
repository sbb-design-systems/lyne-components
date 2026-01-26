import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbPropertyWatcherController } from '../../core/controllers.ts';
import { SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './expansion-panel-content.scss?lit&inline';

/**
 * It can be used as a container for the content of the `sbb-expansion-panel` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-expansion-panel`.
 */
export
@customElement('sbb-expansion-panel-content')
class SbbExpansionPanelContentElement extends SbbElementInternalsMixin(LitElement) {
  public static override readonly role = 'region';
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  private _previousSize?: string;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-expansion-panel'), {
        size: (s) => {
          if (this._previousSize) {
            this.internals.states.delete(`size-${this._previousSize}`);
          }
          this._previousSize = s.size;
          if (this._previousSize) {
            this.internals.states.add(`size-${this._previousSize}`);
          }
        },
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'content';
  }

  protected override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-expansion-panel-content': SbbExpansionPanelContentElement;
  }
}
