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
import { InterfaceLyneTabGroupLabel } from './lyne-tab-group.custom';

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

  @Event() public selectedTabChange: EventEmitter<void>;

  @Method()
  public async disableTab(tabIndex: number): Promise<void> {
    await this.labels[tabIndex].tabGroupActions.disable();
  }

  @Method()
  public async enableTab(tabIndex: number): Promise<void> {
    await this.labels[tabIndex].tabGroupActions.enable();
  }

  @Method()
  public async activateTab(tabIndex: number): Promise<void> {
    await this.labels[tabIndex].tabGroupActions.activate();
  }

  public labels: InterfaceLyneTabGroupLabel[];
  public contents: Element[];

  private _lastUId = 0;
  private _observer = new MutationObserver(this._onLabelAttributesChange.bind(this));

  public render(): JSX.Element {
    return (
      <Host>
        <div class='tab-group' role='tablist'>
          <slot name='tab-bar' onSlotchange={(): void => this._onTabsSlotChange()}></slot>
        </div>

        <div class='tab-content'>
          <slot onSlotchange={(): void => this._onContentSlotChange()}></slot>
        </div>
      </Host>
    );
  }

  public componentWillLoad(): void {
    this.labels = this._getLabels();
    this.contents = this._getContents();
    this.labels.forEach((label) => this._configure(label));
    this._initSelection();
  }

  private _onContentSlotChange(): void {
    const newLabels = this._getLabels()
      .filter((label) => !this.labels.includes(label));
    const newContents = this._getContents()
      .filter((content) => !this.contents.includes(content));

    // if a new tab/content is added
    if (newLabels.length || newContents.length) {
      this.labels = this.labels.concat(newLabels);
      this.contents = this.contents.concat(newContents);
      this.labels.forEach((label) => !label.relatedContent && this._configure(label));
    }
  }

  private _onTabsSlotChange(): void {
    const labels = this._getLabels();

    // if a tab is removed from the tab bar
    if (this.labels.length > labels.length) {
      const removedTabs = this.labels.filter((label) => !labels.includes(label));

      removedTabs.forEach((removedTab) => {
        removedTab.relatedContent?.remove();
      });
      this.labels = labels;
      this.contents = this._getContents();
    }
  }

  public disconnectedCallback(): void {
    this._observer.disconnect();
  }

  private _getLabels(): InterfaceLyneTabGroupLabel[] {
    return (Array.from(this._element.children)
      .filter((child) => (/^H\d$/u).test(child.tagName)) as InterfaceLyneTabGroupLabel[]);
  }

  private _getContents(): Element[] {
    return Array.from(this._element.querySelectorAll('lyne-tab-group > div'));
  }

  private _nextUId(): any {
    return `lt${++this._lastUId}`;
  }

  private _ensureId(el): any {
    el.id = el.id || this._nextUId();

    return el.id;
  }

  private _initSelection(): void {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.labels.length) {
      if (this.labels[this.selectedIndex].hasAttribute('disabled')) {
        this.labels.filter((l) => !l.hasAttribute('disabled'))[0].tabGroupActions.activate();
      } else {
        this.labels[this.selectedIndex].tabGroupActions.activate();
      }
    } else {
      this.labels.filter((l) => !l.hasAttribute('disabled'))[0].tabGroupActions.activate();
    }
  }

  private _onLabelAttributesChange(mutationsList): void {
    for (const mutation of mutationsList) {
      const label = (mutation.target as InterfaceLyneTabGroupLabel);

      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'disabled') {
          if (label.hasAttribute('disabled') && label.getAttribute('disabled') !== 'false') {
            label.tabGroupActions.disable();
          } else if (!label.hasAttribute('disabled') || label.getAttribute('disabled') === 'false') {
            label.tabGroupActions.enable();
          }
        } else if (mutation.attributeName === 'active') {
          if (label.hasAttribute('active') && label.getAttribute('active') !== 'false' && !label.active) {
            mutation.target.tabGroupActions.activate();
          } else if ((!label.hasAttribute('active') && label.active) || label.getAttribute('active') === 'false') {
            const enabledTabs = this.labels.filter((l) => !l.hasAttribute('disabled'));

            if (label === enabledTabs[0]) {
              label.setAttribute('active', '');
            } else {
              enabledTabs[0].tabGroupActions.activate();
            }
          }
        }
      }
    }
  }

  private _configure(label: InterfaceLyneTabGroupLabel): void {
    label.tabGroupActions = {
      activate: (): void => {
        if (!label.active && !label.disabled) {
          const prevTab = this.labels.find((l) => l.active);

          if (prevTab) {
            prevTab.removeAttribute('active');
            prevTab.active = false;
            prevTab.tabIndex = -1;
            prevTab.setAttribute('aria-selected', 'false');
            prevTab.relatedContent?.removeAttribute('active');
          }

          label.setAttribute('active', '');
          label.active = true;
          label.tabIndex = 0;
          label.setAttribute('aria-selected', 'true');
          label.relatedContent?.setAttribute('active', '');
        } else if (label.disabled) {
          console.warn('You cannot activate a disabled tab');
        }
      },
      disable: (): void => {
        if (!label.disabled) {
          label.setAttribute('disabled', '');
          label.disabled = true;
          label.tabIndex = -1;
          label.setAttribute('aria-selected', 'false');
          label.relatedContent?.removeAttribute('active');

          if (label.active) {
            label.removeAttribute('active');
            label.active = false;
            this.labels.filter((l) => !l.hasAttribute('disabled'))[0].tabGroupActions.activate();
          }
        }
      },
      enable: (): void => {
        if (label.disabled) {
          label.removeAttribute('disabled');
          label.disabled = false;
        }
      }
    };
    label.relatedContent = label.nextElementSibling?.tagName === 'DIV'
      ? label.nextElementSibling
      : null;
    label.tabIndex = -1;
    label.active = label.hasAttribute('active');
    label.disabled = label.hasAttribute('disabled');
    label.setAttribute('role', 'tab');
    label.setAttribute('aria-controls', this._ensureId(label));
    label.setAttribute('aria-selected', 'false');

    if (label.relatedContent) {
      label.relatedContent.setAttribute('role', 'tabpanel');
      label.relatedContent.setAttribute('aria-labelledby', label.id);
      if (label.active) {
        label.relatedContent.setAttribute('active', '');
      }
    } else {
      console.error('Missing content!');
    }

    label.addEventListener('click', () => {
      label.tabGroupActions.activate();
    });

    this._observer.observe(label, {
      attributes: true
    });
    label.slot = 'tab-bar';
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledTabs = this.labels.filter((l) => !l.hasAttribute('disabled'));
    const cur = enabledTabs.findIndex((l) => l.active);
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
      enabledTabs[prev].tabGroupActions.activate();
      enabledTabs[prev].focus();
      evt.preventDefault();
    } else if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
      enabledTabs[next].tabGroupActions.activate();
      enabledTabs[next].focus();
      evt.preventDefault();
    }
  }
}
