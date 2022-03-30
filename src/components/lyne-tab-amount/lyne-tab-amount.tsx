import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop
} from '@stencil/core';

import { InterfaceLyneTabAmountAttributes } from './lyne-tab-amount.custom.d';

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
    default: 'styles/lyne-tab-amount.default.scss',
    shared: 'styles/lyne-tab-amount.shared.scss'
  },
  tag: 'lyne-tab-amount'
})

export class LyneTabAmount {

  @Element() private _element: HTMLElement;

  /** Documentation for someProp */
  @Prop() public someProp?: InterfaceLyneTabAmountAttributes['someInterface'];

  @Event() public tabLabelContentChanged!: EventEmitter<void>;

  private _observer = new MutationObserver(() => this.tabLabelContentChanged.emit());

  public render(): JSX.Element {
    return (
      <Host slot='lyne-tab-amount'>
        <span part='label-amount' class='tab-amount'><slot/></span>
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
