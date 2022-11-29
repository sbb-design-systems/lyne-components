import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbTrainAttributes } from './sbb-train.custom.d';

/**
 * @slot unnamed - Used for slotting sbb-sectors.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train.scss',
  tag: 'sbb-train',
})
export class SbbTrain {
  /** General label for "driving direction". */
  @Prop() public directionLabel!: string;

  /** Label for the destination station of the train. */
  @Prop() public station!: string;

  /** Accessibility label for additional information regarding the leaving direction of the train. */
  @Prop() public accessibilityLabel? = '';

  /** Controls the direction indicator to show the arrow LEFT or RIGHT. Default is LEFT.  */
  @Prop({ reflect: true }) public direction: InterfaceSbbTrainAttributes['direction'] = 'left';

  /**
   * Create the aria-label text out of the direction label, station and the accessibility label.
   */
  private _getDirectionAriaLabel(): string {
    let text = `${this.directionLabel} ${this.station}.`;
    text = this.accessibilityLabel.length ? `${text} ${this.accessibilityLabel}.` : text;
    return text;
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-train">
        <div class="sbb-train__sectors">
          <slot />
        </div>

        {this.directionLabel && this.station && (
          <div class="sbb-train__direction" aria-label={this._getDirectionAriaLabel()}>
            <h3 aria-hidden="true" class="sbb-train__direction-heading">
              <span class="sbb-train__direction-label">{this.directionLabel}</span>
              <span class="sbb-train__direction-station">{this.station}</span>
            </h3>
            <div class="sbb-train__direction-indicator">
              <div class="sbb-train__sticky-wrapper">
                <sbb-icon
                  class="sbb-train__direction-arrow"
                  name={
                    this.direction === 'left'
                      ? 'chevron-small-left-small'
                      : 'chevron-small-right-small'
                  }
                ></sbb-icon>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
