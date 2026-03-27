import type { CSSResultGroup, TemplateResult, unsafeCSS } from 'lit';
import { html, unsafeCSS } from 'lit';

import { SbbElement } from '../../core/base-elements.ts';
import { SbbPropertyWatcherController } from '../../core/controllers.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './expansion-panel-content.scss?inline';

/**
 * It can be used as a container for the content of the `sbb-expansion-panel` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-expansion-panel`.
 */
export class SbbExpansionPanelContentElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-expansion-panel-content';
  public static override readonly role = 'region';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

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
