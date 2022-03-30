import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { InterfaceLyneTabAttributes } from '../lyne-tab/lyne-tab.custom';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab-group.default.scss',
    shared: 'styles/lyne-tab-group.shared.scss'
  },
  tag: 'lyne-tab-group'
})

export class LyneTabGroup {

  @Element() private _element: HTMLElement;

  @Prop({
    mutable: true
  }) public selectedIndex = 0;

  @State() public tabs: InterfaceLyneTabAttributes[] = [];

  @Event() public selectedTabChange: EventEmitter<InterfaceLyneTabAttributes>;

  private _tabLabelMap: WeakMap<InterfaceLyneTabAttributes, HTMLButtonElement> = new WeakMap();

  public render(): JSX.Element {

    const currentWritingMode = getDocumentWritingMode();

    return (
      <Host>
        <div class='tab-group' dir={currentWritingMode}>
          {this.tabs.map((tab, index) => (
            <button
              type='button'
              class={`tab ${(tab.active && !tab.disabled) && 'active'}`}
              disabled={tab.disabled}
              onClick={(): void => this._handleLabelClick(tab, index)}
              ref={(el): void => this._registerTabLabelAndAttachContent(tab, el)}
            ></button>
          ))}
        </div>
        <div class='tab-content-container'>
          <slot name='lyne-tab' onSlotchange={this._handleTabsChange}></slot>
        </div>
      </Host>
    );
  }

  @Listen('tabLabelChanged')
  public handleTabLabelChanged(event: CustomEvent<void>): void {
    const tabElement = event.target as InterfaceLyneTabAttributes;
    const labelHost = this._tabLabelMap.get(tabElement);

    if (!labelHost) {
      return;
    }

    const newNode = this._getTabLabelTemplate(tabElement);
    const amount = this._getTabAmountTemplate(tabElement);

    if (newNode) {
      labelHost.replaceChildren(newNode);
    } else {
      labelHost.replaceChildren();
    }

    if (amount) {
      labelHost.appendChild(amount);
    }
  }

  @Listen('tabDisabledChanged')
  public handleTabDisabledChanged(event: CustomEvent<void>): void {
    const tabElement = event.target as InterfaceLyneTabAttributes;
    const labelHost = this._tabLabelMap.get(tabElement);

    labelHost.disabled = tabElement.disabled;
    for (const tab of this.tabs.filter((t) => t.disabled)) {
      tab.active = false;
    }
    this.tabs = [...this.tabs];
  }

  @Watch('selectedIndex')
  public handleSelectedIndexChange(newValue: number, oldValue: number): void {
    if (newValue < 0) {
      this.selectedIndex = 0;

      return;
    } else if (newValue >= this.tabs.length) {
      this.selectedIndex = this.tabs.length - 1;

      return;
    } else if (newValue === oldValue) {
      return;
    }
    const newIndex = this.tabs.findIndex((t) => t.active);

    if (newValue === newIndex) {
      return;
    }
    for (const tab of this.tabs.filter((t, i) => i !== newValue && t.active)) {
      tab.active = false;
    }
    this.tabs[newValue].active = true;
  }

  private _handleTabsChange = (): void => {
    this.tabs =
      this._element
        .shadowRoot.querySelector<HTMLSlotElement>(':host>div slot[name="lyne-tab"]')
        ?.assignedElements()
        .filter((e): e is InterfaceLyneTabAttributes => e.nodeName === 'LYNE-TAB') ?? [];

    if (this.selectedIndex >= 0 && this.tabs.length) {
      this.tabs[this.selectedIndex].active = true;
    } else {
      this.tabs[0].active = true;
    }

    const activeTabs = this.tabs.filter((t) => t.active);

    if (activeTabs.length === 0 && this.tabs.length) {
      this.tabs[0].active = true;
    } else if (activeTabs.length > 1) {
      for (const tab of activeTabs.slice(1)) {
        tab.active = false;
      }
    }
    const newIndex = this.tabs.findIndex((t) => t.active);

    if (this.selectedIndex !== newIndex) {
      this.selectedIndex = newIndex;
    }
  };

  private _handleLabelClick = (tab: InterfaceLyneTabAttributes, index: number): void => {
    for (const tabEntry of this.tabs.filter((t) => t !== tab)) {
      tabEntry.active = false;
    }
    if (!tab.active) {
      tab.active = true;
    }
    if (this.selectedIndex !== index) {
      this.selectedIndex = index;
      this.selectedTabChange.emit(tab);
    }
  };

  private _registerTabLabelAndAttachContent(tab: InterfaceLyneTabAttributes, el: HTMLButtonElement): void {
    if (this._tabLabelMap.has(tab)) {
      return;
    }

    this._tabLabelMap.set(tab, el);
    const newNode = this._getTabLabelTemplate(tab);
    const amount = this._getTabAmountTemplate(tab);

    if (newNode) {
      el.replaceChildren(newNode);
    }

    if (amount) {
      el.appendChild(amount);
    }
  }

  private _getTabLabelTemplate(tab: InterfaceLyneTabAttributes): Node | undefined {
    const labelElement = tab.shadowRoot?.querySelector(':host>template.lyne-tab-label-template slot[name="lyne-tab-label"]');
    const labelAttribute = tab.shadowRoot?.querySelector(':host>template.lyne-tab-label-template div.lyne-tab-label');

    const label = (labelElement as HTMLSlotElement).assignedElements()[0]
      ? (labelElement as HTMLSlotElement).assignedElements()[0]
      : labelAttribute;

    return label?.cloneNode(true);
  }

  private _getTabAmountTemplate(tab: InterfaceLyneTabAttributes): Node | undefined {
    const amountElement = tab.shadowRoot?.querySelector<HTMLTemplateElement>(':host>template.lyne-tab-label-template')?.lastElementChild;

    return amountElement?.nodeName === 'SLOT'
      ? (amountElement as HTMLSlotElement).assignedElements()[0]?.cloneNode(true)
      : amountElement?.cloneNode(true);
  }
}
