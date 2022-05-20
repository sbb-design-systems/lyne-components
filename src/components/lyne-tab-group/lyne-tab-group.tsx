import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop
} from '@stencil/core';
import { InterfaceLyneTabGroupTab } from './lyne-tab-group.custom';
import throttle from '../../global/helpers/throttle';

/**
 * @slot tab-bar - Pass an heading tag to display a label in the tab bar.
 * Example: `<h1>Tab label</h1>`
 * @slot unnamed - Pass html-content to show as the content of the tab.
 * Wrap the content in a div:
 * This is correct: `<div>Some text <p>Some other text</p></div>`
 * This is not correct: `<div>Some text</div><p>Some other text</p>`
 */

const tabObserverConfig: MutationObserverInit = {
  attributeFilter: [
    'active',
    'disabled'
  ]
};

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab-group.default.scss',
    shared: 'styles/lyne-tab-group.shared.scss'
  },
  tag: 'lyne-tab-group'
})

export class LyneTabGroup {

  /**
   * Sets the initial tab. If it matches a disabled tab or exceeds the length of
   * the tab group, the first enabled tab will be selected.
   */
  @Prop() public initialSelectedIndex = 0;

  /**
   * On selected tab change
   */
  @Event({
    eventName: 'lyne-tab-group_tab-change'
  }) public selectedTabChanged: EventEmitter<void>;

  /**
   * Disable tab by index
   */
  @Method()
  public async disableTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex]?.tabGroupActions.disable();
  }

  /**
   * Enable tab by index
   */
  @Method()
  public async enableTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex]?.tabGroupActions.enable();
  }

  /**
   * Activate tab by index
   */
  @Method()
  public async activateTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex]?.tabGroupActions.select();
  }

  @Element() private _element: HTMLElement;

  public tabs: InterfaceLyneTabGroupTab[];
  private _lastUId = 0;
  private _tabContentElement: HTMLElement;
  private _tabAttributeObserver = new MutationObserver(this._onTabAttributesChange.bind(this));
  private _tabContentResizeObserver = new ResizeObserver(this._onTabContentElementResize.bind(this));

  private _getTabs(): InterfaceLyneTabGroupTab[] {
    return (Array.from(this._element.children)
      .filter((child) => (/^H\d$/u).test(child.tagName)) as InterfaceLyneTabGroupTab[]);
  }

  private get _enabledTabs(): InterfaceLyneTabGroupTab[] {
    return this.tabs.filter((t) => !t.hasAttribute('disabled'));
  }

  public componentWillLoad(): void {
    this.tabs = this._getTabs();
    this.tabs.forEach((tab) => this._configure(tab));
    this._initSelection();
  }

  public disconnectedCallback(): void {
    this._tabAttributeObserver.disconnect();
    this._tabContentResizeObserver.disconnect();
  }

  private _onContentSlotChange = (): void => {
    this._tabContentElement = this._element.shadowRoot.querySelector('div.tab-content');
    const loadedTabs = this._getTabs()
      .filter((tab) => !this.tabs.includes(tab));

    // if a new tab/content is added to the tab group
    if (loadedTabs.length) {
      loadedTabs.forEach((tab) => this._configure(tab));
      this.tabs = this.tabs.concat(loadedTabs);
    }
  };

  private _onTabsSlotChange = (): void => {
    const tabs = this._getTabs();

    // if a tab is removed from the tab group
    if (tabs.length < this.tabs.length) {
      const removedTabs = this.tabs.filter((tab) => !tabs.includes(tab));

      removedTabs.forEach((removedTab) => {
        removedTab.relatedContent?.remove();
      });
      this.tabs = tabs;
    }
  };

  private _nextUId(): string {
    return `lyne-tab-${++this._lastUId}`;
  }

  private _ensureId(el): string {
    el.id = el.id || this._nextUId();

    return el.id;
  }

  private _initSelection(): void {
    if (this.initialSelectedIndex >= 0 &&
        this.initialSelectedIndex < this.tabs.length &&
        !this.tabs[this.initialSelectedIndex].hasAttribute('disabled')) {
      this.tabs[this.initialSelectedIndex].tabGroupActions.select();
    } else {
      this._enabledTabs[0]?.tabGroupActions.select();
    }
  }

  private _onTabAttributesChange(mutationsList): void {
    for (const mutation of mutationsList) {
      if (mutation.type !== 'attributes') {
        return;
      }
      const tab = (mutation.target as InterfaceLyneTabGroupTab);

      if (mutation.attributeName === 'disabled') {
        if (this._isValidTabAttribute(tab, 'disabled')) {
          tab.tabGroupActions.disable();
        } else if (tab.disabled) {
          tab.tabGroupActions.enable();
        }
      }
      if (mutation.attributeName === 'active') {
        if (this._isValidTabAttribute(tab, 'active') && !tab.disabled) {
          tab.tabGroupActions.select();
        } else if (tab.active) {
          tab.setAttribute('active', '');
        }
      }
    }
  }

  private _isValidTabAttribute(tab: InterfaceLyneTabGroupTab, attribute: string): boolean {
    return tab.hasAttribute(attribute) && tab.getAttribute(attribute) !== 'false';
  }

  private _onTabContentElementResize(entries): void {
    for (const entry of entries) {
      const contentHeight = Math.floor(entry.contentRect.height);

      (this._tabContentElement as HTMLElement).style.height = `${contentHeight}px`;
    }
  }

  private _configure(tab: InterfaceLyneTabGroupTab): void {
    tab.tabGroupActions = {
      activate: (): void => {
        tab.setAttribute('active', '');
        tab.active = true;
        tab.tabIndex = 0;
        tab.setAttribute('aria-selected', 'true');
        tab.relatedContent?.setAttribute('active', '');
      },
      deactivate: (): void => {
        tab.removeAttribute('active');
        tab.active = false;
        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
        tab.relatedContent?.removeAttribute('active');
      },
      disable: (): void => {
        if (tab.disabled) {
          return;
        }
        if (!tab.hasAttribute('disabled')) {
          tab.setAttribute('disabled', '');
        }
        tab.disabled = true;
        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
        tab.relatedContent?.removeAttribute('active');
        if (tab.active) {
          tab.removeAttribute('active');
          tab.active = false;
          this._enabledTabs[0]?.tabGroupActions.select();
        }
      },
      enable: (): void => {
        if (tab.disabled) {
          tab.removeAttribute('disabled');
          tab.disabled = false;
        }
      },
      select: (): void => {
        if (!tab.active && !tab.disabled) {
          const prevTab = this.tabs.find((t) => t.active);

          if (prevTab) {
            prevTab.tabGroupActions.deactivate();
            this._tabContentResizeObserver.unobserve(prevTab.relatedContent);
          }
          tab.tabGroupActions.activate();
          this._tabContentResizeObserver.observe(tab.relatedContent);
          this.selectedTabChanged.emit();
        } else if (tab.disabled) {
          console.warn('You cannot activate a disabled tab');
        }
      }
    };
    this._ensureId(tab);
    tab.relatedContent = tab.nextElementSibling?.tagName === 'DIV'
      ? tab.nextElementSibling
      : null;
    tab.tabIndex = -1;
    tab.active = tab.hasAttribute('active');
    tab.disabled = tab.hasAttribute('disabled');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', this._ensureId(tab.relatedContent));
    tab.setAttribute('aria-selected', 'false');

    if (tab.relatedContent) {
      tab.relatedContent.setAttribute('role', 'tabpanel');
      tab.relatedContent.setAttribute('aria-labelledby', tab.id);
      if (tab.active) {
        tab.relatedContent.setAttribute('active', '');
      }
    } else {
      console.error('Missing content: you should provide a related content.');
    }

    tab.addEventListener('click', () => {
      tab.tabGroupActions.select();
    });

    this._tabAttributeObserver.observe(tab, tabObserverConfig);
    tab.slot = 'tab-bar';
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledTabs = this._enabledTabs;
    const cur = enabledTabs.findIndex((t) => t.active);
    const size = enabledTabs.length;
    const prev = cur === 0
      ? size - 1
      : cur - 1;
    const next = cur === size - 1
      ? 0
      : cur + 1;

    // don't trap nested handling
    if ((evt.target as HTMLElement).parentElement !== evt.currentTarget) {
      return;
    }

    if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') {
      enabledTabs[prev]?.tabGroupActions.select();
      enabledTabs[prev]?.focus();
      evt.preventDefault();
    } else if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
      enabledTabs[next]?.tabGroupActions.select();
      enabledTabs[next]?.focus();
      evt.preventDefault();
    }
  }

  public render(): JSX.Element {
    return (
      <Host>
        <div class='tab-group' role='tablist'>
          <slot name='tab-bar' onSlotchange={this._onTabsSlotChange}></slot>
        </div>

        <div class='tab-content'>
          <slot onSlotchange={throttle(this._onContentSlotChange, 250)}></slot>
        </div>
      </Host>
    );
  }
}
