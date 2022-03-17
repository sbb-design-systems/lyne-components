import {
  Component,
  Element,
  h,
  Prop
} from '@stencil/core';
import events from './lyne-tab-group.events';

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

  /** Tab labels */
  @Prop() public labelone?: string;
  @Prop() public labeltwo?: string;
  @Prop() public labelthree?: string;

  /** Define if icon should be shown or not */
  @Prop() public icon1? = false;
  @Prop() public icon2? = false;
  @Prop() public icon3? = false;

  /** If you use an icon without a label, you must provide an iconDescription */
  @Prop() public iconDescription1?: string;

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
      <div class="tabs">
        <div class="tab-group">
          {this.icon1
            ? <div class="tab active" onClick={this._clickHandler} icon-description="{this.iconDescription1}">{this.labelone} #</div>
            : <div class="tab active" onClick={this._clickHandler}>{this.labelone}</div>
          }

          {this.icon2
            ? <div class="tab" onClick={this._clickHandler} icon-description="{this.iconDescription1}">{this.labeltwo} #</div>
            : <div class="tab" onClick={this._clickHandler}>{this.labeltwo}</div>
          }

          {this.icon3
            ? <div class="tab" onClick={this._clickHandler} icon-description="{this.iconDescription1}">{this.labelthree} #</div>
            : <div class="tab" onClick={this._clickHandler}>{this.labelthree}</div>
          }
        </div>
        <div class="content-tab-group">
          <div class="tab-content visible">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </div>
          <div class="tab-content">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </div>
          <div class="tab-content">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </div>
        </div>
      </div>
    );
  }
}
