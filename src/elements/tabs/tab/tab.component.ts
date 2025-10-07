import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../../core/mixins.js';
import type { SbbTabGroupElement } from '../tab-group/tab-group.component.js';
import type { SbbTabLabelElement } from '../tab-label.js';

import style from './tab.scss?lit&inline';

let nextId = 0;

/**
 * Combined with a `sbb-tab-group` and `sbb-tab-label`, it displays a tab's content.
 *
 * @slot - Use the unnamed slot to provide content.
 * @event {Event} active - The `active` event fires when the sbb-tab has been activated via user selection on the sbb-tab-label.
 */
export
@customElement('sbb-tab')
class SbbTabElement extends SbbElementInternalsMixin(LitElement) {
  public static override role = 'tabpanel';
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    active: 'active',
  } as const;

  private _tabContentResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this._onTabContentElementResize(),
  });

  /** The `sbb-tab-label` associated with the tab. */
  public get label(): SbbTabLabelElement | null {
    return this.previousElementSibling?.localName === 'sbb-tab-label'
      ? (this.previousElementSibling as SbbTabLabelElement)
      : null;
  }

  /** Get the parent `sbb-tab-group`. */
  public get group(): SbbTabGroupElement | null {
    return this.closest('sbb-tab-group');
  }

  public constructor() {
    super();

    this.addController(
      new MutationController(this, {
        config: { attributeFilter: ['data-active'] },
        callback: (mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.attributeName === 'data-active') {
              if (this.hasAttribute('data-active')) {
                this._tabContentResizeObserver.observe(this);
              } else {
                this._tabContentResizeObserver.unobserve(this);
              }
            }
          }
        },
      }),
    );
  }

  /**
   * @internal
   * @deprecated
   */
  public configure(): void {}

  public override connectedCallback(): void {
    super.connectedCallback();

    this.id ||= `sbb-tab-${nextId++}`;
    this.tabIndex = 0;
  }

  private _onTabContentElementResize(): void {
    if (this.hasAttribute('data-active')) {
      this.group?.['setHeightResizeTab'](Math.floor(this.getBoundingClientRect().height));
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-tab">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab': SbbTabElement;
  }
}
