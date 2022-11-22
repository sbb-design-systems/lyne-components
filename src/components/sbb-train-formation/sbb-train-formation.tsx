import { Component, Element, h, JSX } from '@stencil/core';

import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train-formation.scss',
  tag: 'sbb-train-formation',
})
export class SbbTrainFormation {
  /** Host element */
  @Element() private _element!: HTMLElement;

  /** Slotted sbb-trains */
  private _slottedTrains: HTMLSbbTrainElement[];

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
    this._slottedTrains.forEach((train) => this._applyCssWidthVarToTrains(train));
  }

  public componentDidLoad(): void {
    this._formationDiv = this._element.shadowRoot.querySelectorAll(
      '.sbb-train-formation'
    )[0] as HTMLDivElement;
    this._contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._contentResizeObserver.observe(
      this._element.shadowRoot.querySelector('.sbb-train-formation')
    );
    this._slottedTrains = this._getTrains();
    this._slottedTrains.forEach((train) => this._applyCssWidthVarToTrains(train));
  }

  /**
   * Get all slotted sbb-train elements
   */
  private _getTrains(): HTMLSbbTrainElement[] {
    return Array.from(this._element.children).filter(
      (e): e is HTMLSbbTrainElement => e.tagName === 'SBB-TRAIN'
    );
  }

  private _onSlotChange(): void {
    this._slottedTrains = this._getTrains();
    this._slottedTrains.forEach((train) => this._applyCssWidthVarToTrains(train));
  }

  /**
   * Apply to every given sbb-train the possbile width of the scrollable space of the formation as a
   * css variable
   */
  private _applyCssWidthVarToTrains(train: HTMLSbbTrainElement): void {
    train.style.setProperty('--sbb-train-direction-width', `${this._contentWidth}px`);
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-train-formation">
        <slot onSlotchange={this._onSlotChange} />
      </div>
    );
  }
}
