import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbTrainAttributes } from './sbb-train.custom.d';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

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

  /** The semantic level of the direction level, e.g. 3 = h3. */
  @Prop() public directionLabelLevel: InterfaceTitleAttributes['level'] = '3';

  /** Label for the destination station of the train. */
  @Prop() public station?: string;

  /** Accessibility label for additional information regarding the leaving direction of the train. */
  @Prop() public accessibilityLabel? = '';

  /** Controls the direction indicator to show the arrow left or right. Default is left.  */
  @Prop({ reflect: true }) public direction: InterfaceSbbTrainAttributes['direction'] = 'left';

  /**
   * Create the aria-label text out of the direction label, station and the accessibility label.
   */
  private _getDirectionAriaLabel(): string {
    const text = `${this.directionLabel} ${this.station}.`;
    return this.accessibilityLabel?.length ? `${text} ${this.accessibilityLabel}.` : text;
  }

  public render(): JSX.Element {
    const DIRECTION_TAG_NAME = `h${this.directionLabelLevel}`;
    return (
      <div class="sbb-train">
        <div class="sbb-train__sectors">
          <slot />
        </div>

        {this.directionLabel && (
          <div class="sbb-train__direction" aria-label={this._getDirectionAriaLabel()}>
            <DIRECTION_TAG_NAME aria-hidden="true" class="sbb-train__direction-heading">
              <span class="sbb-train__direction-label">{this.directionLabel}</span>
              {this.station && <span class="sbb-train__direction-station">{this.station}</span>}
            </DIRECTION_TAG_NAME>
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
