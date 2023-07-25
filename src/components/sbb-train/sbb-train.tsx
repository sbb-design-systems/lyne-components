import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State,
} from '@stencil/core';
import { InterfaceSbbTrainAttributes } from './sbb-train.custom';
import { i18nTrain, i18nWagonsLabel } from '../../global/i18n';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';

/**
 * @slot unnamed - Used for slotting sbb-train-wagons.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train.scss',
  tag: 'sbb-train',
})
export class SbbTrain implements ComponentInterface {
  /** General label for "driving direction". */
  @Prop() public directionLabel!: string;

  /** Heading level of the direction label, used for screen readers. */
  @Prop() public directionLabelLevel: InterfaceTitleAttributes['level'] = '6';

  /** Label for the destination station of the train. */
  @Prop() public station?: string;

  /** Accessibility label for additional information regarding the leaving direction of the train. */
  @Prop() public accessibilityLabel?: string;

  /** Controls the direction indicator to show the arrow left or right. Default is left.  */
  @Prop({ reflect: true }) public direction: InterfaceSbbTrainAttributes['direction'] = 'left';

  @State() private _wagons: (HTMLSbbTrainBlockedPassageElement | HTMLSbbTrainWagonElement)[];

  @State() private _currentLanguage = documentLanguage();

  /**
   * @internal
   * Emits whenever the train slot changes.
   */
  @Event({ bubbles: true, cancelable: true }) public trainSlotChange: EventEmitter;

  @Element() private _element!: HTMLSbbTrainElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._readWagons();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  /**
   * Create the aria-label text out of the direction label, station and the accessibility label.
   */
  private _getDirectionAriaLabel(): string {
    const textParts: string[] = [i18nTrain[this._currentLanguage]];

    if (this.directionLabel && this.station) {
      textParts.push(`${this.directionLabel} ${this.station}`);
    }

    if (this.accessibilityLabel) {
      textParts.push(this.accessibilityLabel);
    }

    return `${textParts.join(', ')}.`;
  }

  private _readWagons(): void {
    const wagons = Array.from(this._element.children).filter(
      (e): e is HTMLSbbTrainBlockedPassageElement | HTMLSbbTrainWagonElement =>
        e.tagName === 'SBB-TRAIN-WAGON' || e.tagName === 'SBB-TRAIN-BLOCKED-PASSAGE',
    );
    // If the slotted sbb-train-wagon and sbb-train-blocked-passage instances have not changed, we can skip syncing and updating
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

  private _handleSlotChange(): void {
    this.trainSlotChange.emit();
    this._readWagons();
  }

  public render(): JSX.Element {
    const TITLE_TAG_NAME = `h${this.directionLabelLevel}`;
    this._wagons.forEach((wagon, index) => wagon.setAttribute('slot', `wagon-${index}`));

    return (
      <div class="sbb-train">
        <TITLE_TAG_NAME class="sbb-train__direction-label-sr">
          {this._getDirectionAriaLabel()}
        </TITLE_TAG_NAME>
        <ul class="sbb-train__wagons" aria-label={i18nWagonsLabel[this._currentLanguage]}>
          {this._wagons.map((_, index) => (
            <li>
              <slot name={`wagon-${index}`} onSlotchange={(): void => this._handleSlotChange()} />
            </li>
          ))}
        </ul>
        <span hidden>
          <slot onSlotchange={() => this._handleSlotChange()} />
        </span>

        {this.directionLabel && (
          <div class="sbb-train__direction" aria-hidden="true">
            <div class="sbb-train__direction-heading">
              <span class="sbb-train__direction-label">{this.directionLabel}</span>
              {this.station && <span class="sbb-train__direction-station">{this.station}</span>}
            </div>
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
