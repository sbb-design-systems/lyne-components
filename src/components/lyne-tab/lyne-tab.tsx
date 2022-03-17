import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-tab.events';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab.default.scss',
    shared: 'styles/lyne-tab.shared.scss'
  },
  tag: 'lyne-tab'
})

export class LyneTab {

  /** Documentation for someProp */
    /** Tab labels  */
  @Prop() public label?: string;

  /** Define if icon should be shown or not */
  @Prop() public icon? = false;

  /** If you use an icon without a label, you must provide an iconDescription */
  @Prop() public iconDescription?: string;

  @Element() private _element: HTMLElement;

  private _clickHandler = (): void => {

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: 'some event detail'
    });

    this._element.dispatchEvent(event);
  };

  public render(): JSX.Element {
    return (
      <div class="tab import">
        {this.icon
          ? <div class="tab active" onClick={this._clickHandler} icon-description="{this.iconDescription}">{this.label} #</div>
          : <div class="tab active" onClick={this._clickHandler}>{this.label}</div>
        }
        <div class="tab-content visible">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
          Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </div>
      </div>
    );
  }
}
