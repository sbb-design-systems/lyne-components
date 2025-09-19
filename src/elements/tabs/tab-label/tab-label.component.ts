import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { forceType, omitEmptyConverter, slotState } from '../../core/decorators.js';
import { SbbDisabledMixin, SbbElementInternalsMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbTitleLevel } from '../../title.js';
import type { SbbTabElement } from '../tab/tab.component.js';
import type { SbbTabChangedEventDetails, SbbTabGroupElement } from '../tab-group.js';

import style from './tab-label.scss?lit&inline';

/**
 * Combined with a `sbb-tab-group`, it displays a tab's title.
 *
 * @slot - Use the unnamed slot to add content to the tab title.
 * @slot icon - Use this slot to display an icon to the left of the title, by providing the `sbb-icon` component.
 * @slot amount - Provide a number to show an amount to the right of the title.
 */
export
@customElement('sbb-tab-label')
@slotState()
class SbbTabLabelElement extends SbbDisabledMixin(
  SbbIconNameMixin(SbbElementInternalsMixin(LitElement)),
) {
  public static override role = 'tab';
  public static override styles: CSSResultGroup = style;

  /** Whether the tab is selected. */
  private _selected: boolean = false;

  /**
   * The level will correspond to the heading tag generated in the title.
   * Use this property to generate the appropriate header tag, taking SEO into consideration.
   */
  @property() public accessor level: SbbTitleLevel = '1';

  /** Active tab state. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor active: boolean = false;

  /** Amount displayed inside the tab. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor amount: string = '';

  /** Get the `sbb-tab` related to the `sbb-tab-label`. */
  private get _tab(): SbbTabElement | null {
    return this.nextElementSibling?.localName === 'sbb-tab'
      ? (this.nextElementSibling as SbbTabElement)
      : null;
  }

  /** Get the parent `sbb-tab-group`. */
  private get _tabGroup(): SbbTabGroupElement | null {
    return this.closest('sbb-tab-group');
  }

  public constructor() {
    super();

    this.addEventListener('click', () => this.select());
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot = 'tab-bar';
    this.tabIndex = this.active ? 0 : -1;
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('active')) {
      this.internals.ariaSelected = `${this.active}`;
      this._tab?.toggleAttribute('data-active', this.active);

      if (this.active && !this.disabled) {
        this.select();
      } else {
        this.deactivate();
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }

  /** Deactivate the tab. */
  public deactivate(): void {
    this.active = false;
    this._selected = false;
    this.tabIndex = -1;
  }

  /** Disable the tab; if it's active, select the first tab in the group. */
  public disable(): void {
    if (this.disabled) {
      return;
    }
    this.disabled = true;
    this.tabIndex = -1;
    if (this.active) {
      this.deactivate();
      this._tabGroup?.activateTab(0);
    }
  }

  /** Enable the tab. */
  public enable(): void {
    if (this.disabled) {
      this.disabled = false;
    }
  }

  /** Select the tab, deactivating the current selected one, and dispatch the tabchange event. */
  public select(): void {
    if (this.disabled) {
      if (import.meta.env.DEV) {
        console.warn('You cannot activate a disabled tab');
      }
      return;
    }

    const tabLabels: SbbTabLabelElement[] = this._tabGroup?.tabLabels || [];
    const prevActiveTabLabel = tabLabels.find((e) => e._selected);
    if (prevActiveTabLabel !== this) {
      prevActiveTabLabel?.deactivate();
      this.active = true;
      this._selected = true;
      this.tabIndex = 0;
      this._tab?.dispatchEvent(new Event('active', { bubbles: true, composed: true }));
      this._tabGroup?.dispatchEvent(
        new CustomEvent<SbbTabChangedEventDetails>('tabchange', {
          bubbles: true,
          composed: true,
          detail: {
            activeIndex: tabLabels.findIndex((e) => e === this),
            activeTabLabel: this,
            activeTab: this._tab as SbbTabElement,
            previousIndex: tabLabels.findIndex((e) => e === prevActiveTabLabel),
            previousTabLabel: prevActiveTabLabel,
            previousTab: prevActiveTabLabel?._tab as SbbTabElement,
          },
        }),
      );
    }
  }

  protected linkToTab(): void {
    if (!this._tab) {
      if (import.meta.env.DEV) {
        console.warn(
          `Missing content: you should provide a related content for the tab ${this.outerHTML}.`,
        );
      }
      return;
    }
    this.internals.ariaControlsElements = [this._tab];
  }

  protected override render(): TemplateResult {
    const TAGNAME = `h${Number(this.level) < 7 ? this.level : '1'}`;

    /* eslint-disable lit/binding-positions */
    return html`
      <div class="sbb-tab-label__wrapper">
        <${unsafeStatic(TAGNAME)} class="sbb-tab-label">
          <span class="sbb-tab-label__icon">
            ${this.renderIconSlot()}
          </span>
          <span class="sbb-tab-label__text">
            <slot></slot>
          </span>
          <span class="sbb-tab-label__amount">
            <slot name="amount">${this.amount}</slot>
          </span>
        </${unsafeStatic(TAGNAME)}>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab-label': SbbTabLabelElement;
  }
}
