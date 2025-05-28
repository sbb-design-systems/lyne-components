import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { forceType, omitEmptyConverter, slotState } from '../../core/decorators.js';
import { SbbDisabledMixin, SbbElementInternalsMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbTitleLevel } from '../../title.js';
import type { SbbTabElement } from '../tab/tab.component.js';

import style from './tab-label.scss?lit&inline';
import type { SbbTabGroupElement } from '../tab-group.js';

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

  /**
   * The level will correspond to the heading tag generated in the title.
   * Use this property to generate the appropriate header tag, taking SEO into consideration.
   */
  @property() public accessor level: SbbTitleLevel = '1';

  /** Active tab state */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor active: boolean = false;

  /** Amount displayed inside the tab. */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor amount: string = '';

  public get tab(): SbbTabElement | null {
    return this.nextElementSibling?.localName === 'sbb-tab'
      ? (this.nextElementSibling as SbbTabElement)
      : null;
  }

  public get tabGroup(): SbbTabGroupElement | null {
    return this.closest('sbb-tab-group');
  }

  public constructor() {
    super();

    this.addEventListener('click', () => this.select());
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.slot ||= 'tab-bar';
    this.tabIndex = this.active ? 0 : -1;
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('active')) {
      this.internals.ariaSelected = `${this.active}`;
      this.tab?.toggleAttribute('data-active', this.active);

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

  public activate(): void {
    this.active = true;
    this.tabIndex = 0;
    this.tab?.toggleAttribute('data-active', true);
  }

  public deactivate(): void {
    this.active = false;
    this.tabIndex = -1;
    this.tab?.removeAttribute('data-active');
  }

  public disable(): void {
    if (tabLabel.disabled) {
      return;
    }
    if (!tabLabel.hasAttribute('disabled')) {
      tabLabel.toggleAttribute('disabled', true);
    }
    tabLabel.disabled = true;
    tabLabel.tabIndex = -1;
    tabLabel.setAttribute('aria-selected', 'false');
    tabLabel.tab?.removeAttribute('active');
    if (tabLabel.active) {
      tabLabel.removeAttribute('active');
      tabLabel.active = false;
      this._enabledTabs()[0]?.tabGroupActions?.select();
    }
  }

  public enable(): void {
    if (tabLabel.disabled) {
      tabLabel.removeAttribute('disabled');
      tabLabel.disabled = false;
    }
  }

  public select(): void {
    if (this.disabled) {
      // active?
      return;
    }

    this.tabGroup?.tabLabels?.forEach((tabLabel) => {
      if (tabLabel !== this) {
        tabLabel.deactivate();
      }
    }

    this.activate();

    if (tabLabel !== this._selectedTab) {
      const prevTab = this._selectedTab;

      if (prevTab) {
        prevTab.tabGroupActions?.deactivate();
        this._tabContentResizeObserver.unobserve(prevTab.tab!);
      }

      tabLabel.tabGroupActions?.activate();
      this._selectedTab = tabLabel;

      this._tabContentResizeObserver.observe(tabLabel.tab!);
      const tabs = this._tabs;
      this._selectedTabChanged.emit({
        activeIndex: tabs.findIndex((e) => e === tabLabel),
        activeTabLabel: tabLabel,
        activeTab: tabLabel.tab as SbbTabElement,
        previousIndex: tabs.findIndex((e) => e === prevTab),
        previousTabLabel: prevTab,
        previousTab: prevTab?.tab as SbbTabElement,
      });
    } else if (import.meta.env.DEV && tabLabel.disabled) {
      console.warn('You cannot activate a disabled tab');
    }
  }

  /**
   * @internal
   */
  public linkToTab(): void {
    if (!this.tab) {
      return;
    } else if (import.meta.env.DEV) {
      console.warn(
        `Missing content: you should provide a related content for the tab ${this.parentElement.outerHTML}.`,
      );
    }
    this.setAttribute('aria-controls', this.tab.id);
  }

  private _onTabAttributesChange(mutationsList: MutationRecord[]): void {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'attributes') {
        return;
      }
      const tab = mutation.target as SbbTabLabelElement;

      if (mutation.attributeName === 'disabled') {
        if (tab.hasAttribute('disabled') && tab !== this._selectedTab) {
          tab?.disable();
        } else if (tab.disabled) {
          tab?.enable();
        }
      }
      if (mutation.attributeName === 'active') {
        if (tab.hasAttribute('active') && !tab.disabled) {
          tab?.select();
        } else if (tab === this._selectedTab) {
          tab.toggleAttribute('active', true);
        }
      }
    }
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
