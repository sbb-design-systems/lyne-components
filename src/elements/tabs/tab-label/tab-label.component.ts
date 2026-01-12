import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { SbbPropertyWatcherController } from '../../core/controllers.ts';
import { forceType, omitEmptyConverter } from '../../core/decorators.ts';
import { SbbDisabledMixin, SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';
import type { SbbTitleLevel } from '../../title.ts';
import { tabLabelCommonStyles } from '../common.ts';
import type { SbbTabElement } from '../tab/tab.component.ts';
import type { SbbTabChangedEventDetails, SbbTabGroupElement } from '../tab-group.ts';

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
class SbbTabLabelElement extends SbbDisabledMixin(
  SbbIconNameMixin(SbbElementInternalsMixin(LitElement)),
) {
  public static override role = 'tab';
  public static override styles: CSSResultGroup = [boxSizingStyles, tabLabelCommonStyles, style];

  /** Whether the tab is selected. */
  private _selected: boolean = false;
  private _previousSize: SbbTabGroupElement['size'] | null = null;

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
  public get tab(): SbbTabElement | null {
    return this.nextElementSibling?.localName === 'sbb-tab'
      ? (this.nextElementSibling as SbbTabElement)
      : null;
  }

  /** Get the parent `sbb-tab-group`. */
  public get group(): SbbTabGroupElement | null {
    return this.closest('sbb-tab-group');
  }

  public constructor() {
    super();

    this.addEventListener('click', () => this.activate());
    this.addController(
      new SbbPropertyWatcherController(this, () => this.group, {
        size: (g) => {
          if (this._previousSize) {
            this.internals.states.delete(`size-${this._previousSize}`);
          }
          this._previousSize = g?.size || null;
          if (this._previousSize) {
            this.internals.states.add(`size-${this._previousSize}`);
          }
        },
      }),
    );
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

      if (this.active && !this.disabled) {
        this.activate();
      } else {
        this.deactivate();
      }
    }

    if (changedProperties.has('disabled') && this.disabled) {
      this.tabIndex = -1;
      if (this.active) {
        this.deactivate();
        this.group?.activateTab(0);
      }
    }
  }

  /** Deactivate the tab. */
  public deactivate(): void {
    this.active = false;
    this.tab?.['deactivate']();
    this._selected = false;
    this.tabIndex = -1;
  }

  /** Select the tab, deactivating the current selected one, and dispatch the tabchange event. */
  public activate(): void {
    if (this.disabled) {
      if (import.meta.env.DEV) {
        console.warn('You cannot activate a disabled tab');
      }
      return;
    }

    const tabLabels: SbbTabLabelElement[] = this.group?.labels || [];
    const prevActiveTabLabel = tabLabels.find((e) => e._selected);
    if (prevActiveTabLabel !== this) {
      prevActiveTabLabel?.deactivate();
      this.active = true;
      this.tab?.['activate']();
      this._selected = true;
      this.tabIndex = 0;
      this.tab?.dispatchEvent(new Event('active', { bubbles: true, composed: true }));
      this.group?.dispatchEvent(
        new CustomEvent<SbbTabChangedEventDetails>('tabchange', {
          bubbles: true,
          composed: true,
          detail: {
            activeIndex: tabLabels.findIndex((e) => e === this),
            activeTabLabel: this,
            activeTab: this.tab as SbbTabElement,
            previousIndex: tabLabels.findIndex((e) => e === prevActiveTabLabel),
            previousTabLabel: prevActiveTabLabel,
            previousTab: prevActiveTabLabel?.tab as SbbTabElement,
          },
        }),
      );
    }
  }

  /**
   * @internal
   */
  protected linkToTab(): void {
    if (!this.tab) {
      if (import.meta.env.DEV) {
        console.warn(
          `Missing content: you should provide a related content for the tab ${this.outerHTML}.`,
        );
      }
      return;
    }
    this.internals.ariaControlsElements = [this.tab];
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
          <p class="sbb-tab-label__amount">
            <slot name="amount">${this.amount}</slot>
          </p>
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
