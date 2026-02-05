import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { getNextElementIndex, isArrowKeyPressed } from '../../core/a11y.ts';
import { forceType } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import { throttle } from '../../core/eventing.ts';
import {
  SbbElementInternalsMixin,
  SbbHydrationMixin,
  ɵstateController,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { tabGroupCommonStyles } from '../common.ts';
import type { SbbTabLabelElement } from '../tab-label.ts';
import type { SbbTabElement } from '../tab.ts';

import style from './tab-group.scss?lit&inline';

export type SbbTabChangedEventDetails = {
  activeIndex: number;
  activeTabLabel: SbbTabLabelElement;
  activeTab: SbbTabElement;
  previousIndex: number;
  previousTabLabel: SbbTabLabelElement | undefined;
  previousTab: SbbTabElement | undefined;
};

/**
 * It displays one or more tabs, each one with a label and some content.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-tab-group` via `sbb-tab-label` and `sbb-tab` instances.
 * @event {CustomEvent<SbbTabChangedEventDetails>} tabchange - The tabchange event is dispatched when a tab is selected.
 */
export
@customElement('sbb-tab-group')
class SbbTabGroupElement extends SbbElementInternalsMixin(SbbHydrationMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, tabGroupCommonStyles, style];
  public static readonly events = {
    tabchange: 'tabchange',
  } as const;

  private _tabGroupElement!: HTMLElement;
  private _tabContentElement!: HTMLElement;
  private _tabGroupResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this._onTabGroupElementResize(),
  });

  /**
   * Size variant, either s, l or xl.
   * @default 'l' / 's' (lean)
   */
  @property()
  public accessor size: 's' | 'l' | 'xl' = isLean() ? 's' : 'l';

  /**
   * Sets the initial tab. If it matches a disabled tab or exceeds the length of
   * the tab group, the first enabled tab will be selected.
   */
  @forceType()
  @property({ attribute: 'initial-selected-index', type: Number })
  public accessor initialSelectedIndex: number = 0;

  /**
   * If set to true, the `sbb-tab` elements take 100% height of the `sbb-tab-group`.
   * It enables controlling the height on the `sbb-tab-group` element.
   * The content becomes scrollable on overflow.
   */
  @forceType()
  @property({ attribute: 'fixed-height', type: Boolean, reflect: true })
  public accessor fixedHeight: boolean = false;

  /** Gets the slotted `sbb-tab-label`s. */
  public get labels(): SbbTabLabelElement[] {
    /**
     * The querySelector API is not used because when nested tabs are used,
     * the returned array contains the inner tabs too, and this breaks the keyboard navigation.
     */
    return Array.from(this.children ?? []).filter((child) =>
      /^sbb-tab-label$/u.test(child.localName),
    ) as SbbTabLabelElement[];
  }

  /** Gets the slotted `sbb-tab`s. */
  public get tabs(): SbbTabElement[] {
    /**
     * The querySelector API is not used because when nested tabs are used,
     * the returned array contains the inner tabs too, and this breaks the keyboard navigation.
     */
    return Array.from(this.children ?? []).filter((child) =>
      /^sbb-tab$/u.test(child.localName),
    ) as SbbTabElement[];
  }

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this.labels.forEach((tabLabel) => tabLabel['linkToTab']());
    this._initSelection();

    // To avoid animations on initialization, we have to mark the component as initialized and wait a tick.
    Promise.resolve().then(() => this.internals.states.add('initialized'));
    this._tabGroupResizeObserver.observe(this._tabGroupElement);
  }

  /**
   * Disables a tab by index.
   * @param tabIndex The index of the tab you want to disable.
   */
  public disableTab(tabIndex: number): void {
    if (this.labels[tabIndex]) {
      this.labels[tabIndex].disabled = true;
    }
  }

  /**
   * Enables a tab by index.
   * @param tabIndex The index of the tab you want to enable.
   */
  public enableTab(tabIndex: number): void {
    if (this.labels[tabIndex]) {
      this.labels[tabIndex].disabled = false;
    }
  }

  /**
   * Activates a tab by index.
   * @param tabIndex The index of the tab you want to activate.
   */
  public activateTab(tabIndex: number): void {
    this.labels[tabIndex]?.activate();
  }

  private _enabledTabs(): SbbTabLabelElement[] {
    return this.labels.filter((t) => {
      customElements.upgrade(t);
      return !t.disabled;
    });
  }

  private _onContentSlotChange = (): void => {
    this.labels.forEach((tabLabel) => tabLabel['linkToTab']());
    this.labels.find((tabLabel) => tabLabel.active)?.activate();
  };

  private _onLabelSlotChange = (): void => {
    this.labels.forEach((tabLabel) => tabLabel['linkToTab']());
  };

  private _initSelection(): void {
    const selectedTabLabel = this.labels[this.initialSelectedIndex];
    if (selectedTabLabel) {
      customElements.upgrade(selectedTabLabel);
      if (
        this.initialSelectedIndex >= 0 &&
        this.initialSelectedIndex < this.labels.length &&
        !selectedTabLabel.disabled
      ) {
        selectedTabLabel.activate();
        return;
      }
    }
    this._enabledTabs()[0]?.activate();
  }

  private _onTabGroupElementResize(): void {
    const tabLabels = this.labels;
    tabLabels.forEach((tabLabel) => {
      ɵstateController(tabLabel)?.toggle(
        'has-divider',
        tabLabel === tabLabels[0] || tabLabel.offsetLeft === tabLabels[0].offsetLeft,
      );
    });

    this.style.setProperty('--sbb-tab-group-width', `${this._tabGroupElement.clientWidth}px`);
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledTabs: SbbTabLabelElement[] = this._enabledTabs();

    if (
      !enabledTabs ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this && (evt.target as HTMLElement).parentElement !== this)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = enabledTabs.findIndex((t) => t.active);
      const nextIndex: number = getNextElementIndex(evt, current, enabledTabs.length);
      enabledTabs[nextIndex]?.activate();
      enabledTabs[nextIndex]?.focus();
      evt.preventDefault();
    }
  }

  /**
   * @internal
   */
  protected setTabContentHeight(contentHeight: number): void {
    this._tabContentElement.style.height = `${contentHeight}px`;
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="sbb-tab-group"
        role="tablist"
        ${ref((el?: Element) => (this._tabGroupElement = el as HTMLElement))}
      >
        <slot name="tab-bar" @slotchange=${this._onLabelSlotChange}></slot>
      </div>
      <div
        class="sbb-tab-group-content"
        ${ref((el?: Element) => (this._tabContentElement = el as HTMLElement))}
      >
        <slot @slotchange=${throttle(this._onContentSlotChange, 150)}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab-group': SbbTabGroupElement;
  }
}
