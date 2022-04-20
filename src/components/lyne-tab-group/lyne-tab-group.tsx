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
  public disableTab(tabIndex: number): void {
    this.labels[tabIndex].tabGroupState.disable();
  }

  @Method()
  public enableTab(tabIndex: number): void {
    this.labels[tabIndex].tabGroupState.enable();
  }

  @Method()
  public activateTab(tabIndex: number, forceEnable?: boolean): void {
    if (this.labels[tabIndex].disabled && forceEnable) {
      this.labels[tabIndex].tabGroupState.enable();
    }
    this.labels[tabIndex].tabGroupState.activate();
  }

  public labels: InterfaceLyneTabGroupLabel[];
  public contents: Element[];

  private _lastUId = 0;
  private _observer = new MutationObserver(this._onLabelAttributesChange);

  public render(): JSX.Element {
    return (
      <Host>
        <div class='tab-group' role='tablist'>
          <slot name='tab-bar' onSlotchange={() => this._onTabBarSlotChange()}></slot>
        </div>

        <div class='tab-content'>
          <slot></slot>
        </div>
      </Host>
    );
  }

  private _onTabBarSlotChange(): void {
    console.log('Tabs slot changed');
  }

  public componentDidLoad(): void {
    this._configure();
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
        this.labels.filter((l) => !l.hasAttribute('disabled'))[0].tabGroupState.activate();
      } else {
        this.labels[this.selectedIndex].tabGroupState.activate();
      }
    } else {
      this.labels.filter((l) => !l.hasAttribute('disabled'))[0].tabGroupState.activate();
    }
  }

  private _onLabelAttributesChange(mutationsList): void {
    for (const mutation of mutationsList) {
      const label = (mutation.target as InterfaceLyneTabGroupLabel);

      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'disabled') {
          if (label.hasAttribute('disabled') && label.getAttribute('disabled') !== 'false') {
            label.tabGroupState.disable();
          } else if (!label.hasAttribute('disabled') || label.getAttribute('disabled') === 'false') {
            label.tabGroupState.enable();
          }
        } else if (mutation.attributeName === 'active') {
          if (label.hasAttribute('active') && label.getAttribute('active') !== 'false' && !label.active) {
            mutation.target.tabGroupState.enable();
            mutation.target.tabGroupState.activate();
          }
        }
      }
    }
  }

  private _configure(): void {
    this.labels = this._getLabels();
    this.contents = this._getContents();

    this.labels.forEach((label, i) => {
      label.tabGroupState = {
        activate: (): void => {
          if (!label.active && !label.disabled) {
            const prevTab = this.labels.find((l) => l.active);

            if (prevTab) {
              prevTab.removeAttribute('active');
              prevTab.active = false;
              prevTab.tabIndex = -1;
              prevTab.setAttribute('aria-selected', 'false');
              prevTab.tabGroupState.relatedContent.removeAttribute('active');
            }

            label.setAttribute('active', '');
            label.active = true;
            label.tabIndex = 0;
            label.setAttribute('aria-selected', 'true');
            this.contents[i].setAttribute('active', '');
          }
        },
        disable: (): void => {
          if (!label.disabled) {
            label.setAttribute('disabled', '');
            label.disabled = true;
            label.tabIndex = -1;
            label.setAttribute('aria-selected', 'false');
            this.contents[i].removeAttribute('active');

            if (label.active) {
              label.removeAttribute('active');
              label.active = false;
              this.labels.filter((l) => !l.hasAttribute('disabled'))[0].tabGroupState.activate();
            }
          }
        },
        enable: (): void => {
          if (label.disabled) {
            label.removeAttribute('disabled');
            label.disabled = false;
          }
        },
        index: i,
        relatedContent: this.contents[i]
      };

      label.slot = 'tab-bar';
      label.tabIndex = -1;
      label.active = label.hasAttribute('active');
      label.disabled = label.hasAttribute('disabled');
      label.setAttribute('role', 'tab');
      label.setAttribute('aria-controls', this._ensureId(label));
      label.setAttribute('aria-selected', 'false');

      this.contents[i].setAttribute('role', 'tabpanel');
      this.contents[i].setAttribute('aria-labelledby', label.id);

      label.addEventListener('click', () => {
        label.tabGroupState.activate();
      });

      this._observer.observe(label, {
        attributes: true
      });
    });
    this._initSelection();
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const availableTabs = this.labels.filter((l) => !l.hasAttribute('disabled'));
    const cur = availableTabs.findIndex((l) => l.active);
    const size = availableTabs.length;
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
      availableTabs[prev].tabGroupState.activate();
      availableTabs[prev].focus();
      evt.preventDefault();
    } else if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
      availableTabs[next].tabGroupState.activate();
      availableTabs[next].focus();
      evt.preventDefault();
    }
  }
}
