import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbElementInternalsMixin } from '../../core/mixins.ts';
import type { SbbTabGroupElement } from '../tab-group/tab-group.component.ts';
import type { SbbTabLabelElement } from '../tab-label.ts';

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

  public override connectedCallback(): void {
    super.connectedCallback();

    this.id ||= `sbb-tab-${nextId++}`;
    this.tabIndex = 0;
  }

  /** @internal */
  protected activate(): void {
    this.internals.states.add('active');
    this._tabContentResizeObserver.observe(this);
  }

  /** @internal */
  protected deactivate(): void {
    this._tabContentResizeObserver.unobserve(this);
    this.internals.states.delete('active');
  }

  private _onTabContentElementResize(): void {
    this.group?.['setTabContentHeight'](Math.floor(this.getBoundingClientRect().height));
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab': SbbTabElement;
  }
}
