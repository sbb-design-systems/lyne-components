import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import { SbbElement } from '../../core.ts';
import type { SbbTabGroupElement } from '../tab-group/tab-group.component.ts';
import type { SbbTabLabelElement } from '../tab-label/tab-label.component.ts';

import style from './tab.scss?inline';

/**
 * Combined with a `sbb-tab-group` and `sbb-tab-label`, it displays a tab's content.
 *
 * @slot - Use the unnamed slot to provide content.
 * @event {Event} active - The `active` event fires when the sbb-tab has been activated via user selection on the sbb-tab-label.
 */
export class SbbTabElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-tab';
  public static override role = 'tabpanel';
  public static override styles: CSSResultGroup = unsafeCSS(style);
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
    this.tabIndex = 0;

    // As we can't include the scrollbar mixin on the host and to minimize
    // payload, we decided to add the scrollbar class here.
    // This is an exception as we normally don't alter the classList of the host.
    this.classList.add('sbb-scrollbar');
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
