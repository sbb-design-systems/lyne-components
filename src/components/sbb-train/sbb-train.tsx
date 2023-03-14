import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import { InterfaceSbbTrainAttributes } from './sbb-train.custom.d';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

/**
 * @slot unnamed - Used for slotting sbb-wagons.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train.scss',
  tag: 'sbb-train',
})
export class SbbTrain {
  @Element() private _element: HTMLSbbTrainElement;

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
   * @internal
   * Emits whenever the train slot changes.
   */
  @Event({ bubbles: true, cancelable: true }) public trainSlotChange: EventEmitter;

  @State() private _wagons: (HTMLSbbWagonBlockedPassageElement | HTMLSbbWagonElement)[];

  public connectedCallback(): void {
    this._readWagons();
  }

  /**
   * Create the aria-label text out of the direction label, station and the accessibility label.
   */
  private _getDirectionAriaLabel(): string {
    const text = `${this.directionLabel} ${this.station}.`;
    return this.accessibilityLabel?.length ? `${text} ${this.accessibilityLabel}.` : text;
  }

  private _readWagons(): void {
    const wagons = Array.from(this._element.children).filter(
      (e): e is HTMLSbbWagonBlockedPassageElement | HTMLSbbWagonElement =>
        e.tagName === 'SBB-WAGON' || e.tagName === 'SBB-WAGON-BLOCKED-PASSAGE'
    );
    // If the slotted sbb-wagon and sbb-wagon-blocked-passage instances have not changed, we can skip syncing and updating
    // the link reference list.
    if (
      this._wagons &&
      wagons.length === this._wagons.length &&
      this._wagons.every((e, i) => wagons[i] === e)
    ) {
      return;
    }

    this._wagons = wagons;
  }

  public render(): JSX.Element {
    const DIRECTION_TAG_NAME = `h${this.directionLabelLevel}`;
    this._wagons.forEach((wagon, index) => wagon.setAttribute('slot', `wagon-${index}`));

    // TODO translate
    return (
      <Host role="listitem" aria-label={this._getDirectionAriaLabel()}>
        <div class="sbb-train">
          <ul class="sbb-train__wagons" aria-label="Wagons of the train.">
            {this._wagons.map((_, index) => (
              <li>
                <slot name={`wagon-${index}`} onSlotchange={(): void => this._readWagons()} />
              </li>
            ))}
          </ul>
          <span hidden>
            <slot
              onSlotchange={() => {
                this.trainSlotChange.emit();
                this._readWagons();
              }}
            />
          </span>

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
      </Host>
    );
  }
}
