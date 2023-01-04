import { Component, h, JSX } from '@stencil/core';

import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

/**
 * @slot unnamed - Used for slotting sbb-trains.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train-formation.scss',
  tag: 'sbb-train-formation',
})
export class SbbTrainFormation {
  /** Element that defines the visible content width */
  private _formationDiv: HTMLDivElement;

  /**
   * Width of the visible space of the content. It is passed to the sbb-trains as css-var and used
   * for the sticky styling of the direction (indicator/labels/arrows).
   */
  private _contentWidth: number;

  private _contentResizeObserver = new ResizeObserver(this._onResize.bind(this));

  public disconnectedCallback(): void {
    this._contentResizeObserver.disconnect();
  }

  private _onResize(): void {
    this._contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._applyCssWidth();
  }

  public componentDidLoad(): void {
    this._contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._contentResizeObserver.observe(this._formationDiv);
    this._applyCssWidth();
  }

  /**
   * Apply width of the scrollable space of the formation as a css variable. This will be used from
   * every slotted sbb-train for the direction-label
   */
  private _applyCssWidth(): void {
    this._formationDiv.style.setProperty('--sbb-train-direction-width', `${this._contentWidth}px`);
  }

  public render(): JSX.Element {
    return (
      <div
        class="sbb-train-formation"
        ref={(el): void => {
          this._formationDiv = el;
        }}
      >
        <slot />
      </div>
    );
  }
}
