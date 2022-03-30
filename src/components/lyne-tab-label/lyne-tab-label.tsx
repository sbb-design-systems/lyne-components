import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop
} from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

const contentObserverConfig: MutationObserverInit = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab-label.default.scss',
    shared: 'styles/lyne-tab-label.shared.scss'
  },
  tag: 'lyne-tab-label'
})

export class LyneTabLabel implements ComponentInterface {

  @Element() private _element: HTMLElement;

  /** Active tab  */
  @Prop() public active = false;
  @Prop() public icon = false;

  @Event() public tabLabelContentChanged!: EventEmitter<void>;

  private _observer = new MutationObserver(() => this.tabLabelContentChanged.emit());

  public render(): JSX.Element {
    return (
      <Host slot='lyne-tab-label'>
        <span part='label-text' class='tab-label'><slot /></span>
      </Host>
    );
  }

  public connectedCallback(): void {
    this._observer.observe(this._element, contentObserverConfig);
  }

  public disconnectedCallback(): void {
    this._observer.disconnect();
  }
}
