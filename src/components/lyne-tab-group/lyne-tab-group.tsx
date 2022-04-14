import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State
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

  @State() public labels: InterfaceLyneTabGroupLabel[];
  @State() public contents: Element[];

  @Event() public selectedTabChange: EventEmitter<void>;

  private _lastUId = 0;

  public render(): JSX.Element {
    return (
      <Host>
        <div class='tab-group'>
          <slot name='tab-bar'></slot>
        </div>

        <div class='tab-content'>
          <slot></slot>
        </div>
      </Host>
    );
  }

  public componentDidLoad(): void {
    this.labels = this._getLabels();
    this.contents = this._getContents();
    this._configure();
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

  private _configure(): void {
    this.labels.forEach((label, i) => {
      label.tabGroupState = {
        activate: (): void => {
          if (!label.active && !label.hasAttribute('disabled')) {
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
            label.tabIndex = 1;
            label.setAttribute('aria-selected', 'true');
            label.focus();
            this.contents[i].setAttribute('active', '');
          }
        },
        index: i,
        relatedContent: this.contents[i]
      };

      label.slot = 'tab-bar';
      label.tabIndex = -1;
      label.active = false;
      label.setAttribute('role', 'tab');
      label.setAttribute('aria-controls', this._ensureId(label));

      this.contents[i].setAttribute('role', 'tabpanel');
      this.contents[i].setAttribute('aria-labelledby', label.id);

      label.addEventListener('click', () => {
        label.tabGroupState.activate();
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
      evt.preventDefault();
    } else if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
      availableTabs[next].tabGroupState.activate();
      evt.preventDefault();
    }
  }
}
