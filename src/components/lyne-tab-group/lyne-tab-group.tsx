import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  Prop
} from '@stencil/core';
import { InterfaceLyneTabGroupTab } from './lyne-tab-group.custom';
import throttle from '../../global/helpers/throttle';

/**
 * @slot unnamed - Use this to document a slot.
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
  @Prop({
    mutable: true
  }) public selectedIndex = 0;

  /**
   * Disable tab by index
   */
  @Method()
  public async disableTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex].tabGroupActions.disable();
  }

  /**
   * Enable tab by index
   */
  @Method()
  public async enableTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex].tabGroupActions.enable();
  }

  /**
   * Activate tab by index
   */
  @Method()
  public async activateTab(tabIndex: number): Promise<void> {
    await this.tabs[tabIndex].tabGroupActions.toggle();
  }

  @Element() private _element: HTMLElement;

  public tabs: InterfaceLyneTabGroupTab[];
  private _lastUId = 0;
  private _observer = new MutationObserver(this._onTabAttributesChange.bind(this));

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

  public componentWillLoad(): void {
    this.tabs = this._getTabs();
    this.tabs.forEach((tab) => this._configure(tab));
    this._initSelection();
  }

  public disconnectedCallback(): void {
    this._observer.disconnect();
  }

  private _onContentSlotChange = (): void => {
    const newTabs = this._getTabs()
      .filter((tab) => !this.tabs.includes(tab));

    // if a new tab/content is added to the tab group
    if (newTabs.length) {
      newTabs.forEach((tab) => this._configure(tab));
      this.tabs = this.tabs.concat(newTabs);
    }
  };

  private _onTabsSlotChange = (): void => {
    const newTabs = this._getTabs();

    // if a tab is removed from the tab group
    if (newTabs.length < this.tabs.length) {
      const removedTabs = this.tabs.filter((tab) => !newTabs.includes(tab));

      removedTabs.forEach((removedTab) => {
        removedTab.relatedContent?.remove();
      });
      this.tabs = newTabs;
    }
  };

  private _getTabs(): InterfaceLyneTabGroupTab[] {
    return (Array.from(this._element.children)
      .filter((child) => (/^H\d$/u).test(child.tagName)) as InterfaceLyneTabGroupTab[]);
  }

  private _getEnabledTabs(): InterfaceLyneTabGroupTab[] {
    return this.tabs.filter((t) => !t.hasAttribute('disabled'));
  }

  private _nextUId(): string {
    return `lt${++this._lastUId}`;
  }

  private _ensureId(el): string {
    el.id = el.id || this._nextUId();

    return el.id;
  }

  private _initSelection(): void {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.tabs.length) {
      if (this.tabs[this.selectedIndex].hasAttribute('disabled')) {
        this._getEnabledTabs()[0]?.tabGroupActions.toggle();
      } else {
        this.tabs[this.selectedIndex].tabGroupActions.toggle();
      }
    } else {
      this._getEnabledTabs()[0]?.tabGroupActions.toggle();
    }
  }

  private _onTabAttributesChange(mutationsList): void {
    for (const mutation of mutationsList) {
      const tab = (mutation.target as InterfaceLyneTabGroupTab);

      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'disabled') {
          if (this._isValidTabAttribute(tab, 'disabled')) {
            tab.tabGroupActions.disable();
          } else {
            tab.tabGroupActions.enable();
          }
        }
        if (mutation.attributeName === 'active') {
          if (this._isValidTabAttribute(tab, 'active') && !tab.disabled) {
            tab.tabGroupActions.toggle();
          } else {
            tab.tabGroupActions.deactivate();
          }
        }
      }
    }
  }

  private _isValidTabAttribute(tab: InterfaceLyneTabGroupTab, attribute: string): boolean {
    return tab.hasAttribute(attribute) && tab.getAttribute(attribute) !== 'false';
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
        if (!tab.disabled) {
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
            this._getEnabledTabs()[0]?.tabGroupActions.toggle();
          }
        }
      },
      enable: (): void => {
        if (tab.disabled) {
          tab.removeAttribute('disabled');
          tab.disabled = false;
        }
      },
      toggle: (): void => {
        if (!tab.active && !tab.disabled) {
          this.tabs.find((t) => t.active)?.tabGroupActions.deactivate();
          tab.tabGroupActions.activate();
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
      tab.tabGroupActions.toggle();
    });

    this._observer.observe(tab, tabObserverConfig);
    tab.slot = 'tab-bar';
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledTabs = this._getEnabledTabs();
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
      enabledTabs[prev]?.tabGroupActions.toggle();
      enabledTabs[prev]?.focus();
      evt.preventDefault();
    } else if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
      enabledTabs[next]?.tabGroupActions.toggle();
      enabledTabs[next]?.focus();
      evt.preventDefault();
    }
  }
}
