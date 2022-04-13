import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State
} from '@stencil/core';
import { InterfaceLyneTabAttributes } from '../lyne-tab/lyne-tab.custom';
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

  @Event() public selectedTabChange: EventEmitter<InterfaceLyneTabAttributes>;

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

  private _configure(): void {
    this.labels.forEach((label, index) => {
      label.tabGroupState = {
        activate: (): void => {
          if (!label.active) {
            const prevTab = this.labels.find((l) => l.active);

            if (prevTab) {
              prevTab.removeAttribute('active');
              prevTab.active = false;
              prevTab.tabGroupState.relatedContent.removeAttribute('active');
            }

            label.setAttribute('active', '');
            label.active = true;
            this.contents[index].setAttribute('active', '');
          }
        },
        relatedContent: this.contents[index]
      };

      label.slot = 'tab-bar';
      label.tabIndex = index + 1;
      label.active = false;

      label.addEventListener('click', () => {
        label.tabGroupState.activate();
      });
    });
  }
}
