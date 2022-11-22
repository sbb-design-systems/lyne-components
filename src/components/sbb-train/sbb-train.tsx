import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfaceSbbTrainAttributes } from './sbb-train.custom.d';

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train.scss',
  tag: 'sbb-train',
})
export class SbbTrain {
  // TODO Accessibility text for driving direction and adjust readme

  /** General label for "driving direction" */
  @Prop() public directionLabel!: string;

  /** Label for the destination station of the train */
  @Prop() public station!: string;

  /** Accessibility label for additional information regarding the leaving direction of the train */
  @Prop() public accessibilityLabel?: string;

  /** Controls the direction indicator to show the arrow LEFT or RIGHT. Default is LEFT.  */
  @Prop({ reflect: true }) public direction: InterfaceSbbTrainAttributes['direction'] = 'LEFT';

  public render(): JSX.Element {
    return (
      <div class="sbb-train">
        <div class="sbb-train__sectors">
          <slot />
        </div>

        {this.directionLabel && this.station && (
          <div class="sbb-train__direction">
            <h3>
              <span class="sbb-train__direction-label">{this.directionLabel}</span>
              <span class="sbb-train__direction-station">{this.station}</span>
            </h3>
            {this.accessibilityLabel && (
              <p class="sbb-train__accessibility-label">{this.accessibilityLabel}</p>
            )}
            <div class="sbb-train__direction-indicator">
              <div class="sbb-train__sticky-wrapper">
                <sbb-icon
                  name={
                    this.direction === 'LEFT'
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
