import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Host,
  JSX,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { InterfaceSbbTrainWagonAttributes } from './sbb-train-wagon.custom.d';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import {
  i18nAdditionalWagonInformationHeading,
  i18nBlockedPassage,
  i18nClass,
  i18nClosedCompartmentLabel,
  i18nLocomotiveLabel,
  i18nOccupancy,
  i18nSector,
  i18nWagonLabel,
  i18nWagonLabelNumber,
} from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';

/**
 * @slot unnamed - Used to slot one to x icons for meta information of the sbb-train-wagon.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train-wagon.scss',
  tag: 'sbb-train-wagon',
})
export class SbbTrainWagon {
  /** Wagon type. */
  @Prop({ reflect: true }) public type: InterfaceSbbTrainWagonAttributes['type'] = 'wagon';

  /** Occupancy of a wagon. */
  @Prop() public occupancy?: InterfaceSbbTrainWagonAttributes['occupancy'] = 'unknown';

  /** Sector in which to wagon stops. */
  @Prop({ reflect: true }) public sector: string;

  /** Accessibility text for blocked passages of the wagon. */
  @Prop() public blockedPassage: InterfaceSbbTrainWagonAttributes['blockedPassage'] = 'none';

  /** Visible class label of a wagon. */
  @Prop() public wagonClass?: '1' | '2';

  /** Visible label for the wagon number. Not used by type locomotive or closed. */
  @Prop() public label?: string;

  /** Custom accessibility text to overwrite the constructed default text. */
  @Prop() public customAccessibilityLabel?: string;

  /** Additional accessibility text which will be appended to the constructed default text. */
  @Prop() public additionalAccessibilityText?: string;

  /** Slotted Sbb-icons. */
  @State() private _icons: HTMLSbbIconElement[];

  @State() private _currentLanguage = documentLanguage();

  /** Host element. */
  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l))
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._readSlottedIcons();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  /**
   * @internal
   * Emits whenever the sector value changes.
   */
  @Event({ bubbles: true, cancelable: true }) public sectorChange: EventEmitter;

  @Watch('sector')
  public sectorChanged(): void {
    this.sectorChange.emit();
  }

  /**
   * Create an array with only the sbb-icon children.
   */
  private _readSlottedIcons(): void {
    this._icons = Array.from(this._element.children).filter(
      (e): e is HTMLSbbIconElement => e.tagName === 'SBB-ICON'
    );
  }

  /**
   * Create the accessibility text for the specific wagon types.
   */
  private _getAccessibilityText(): string {
    // Custom overwrite text
    if (this.customAccessibilityLabel) {
      return this.customAccessibilityLabel;
    }

    const textParts: string[] = [];
    if (this.type === 'locomotive') {
      textParts.push(i18nLocomotiveLabel[this._currentLanguage]);
    } else if (this.type === 'closed') {
      textParts.push(i18nClosedCompartmentLabel(parseInt(this.label))[this._currentLanguage]);
    } else {
      textParts.push(i18nWagonLabel[this._currentLanguage]);
    }

    if (this.sector) {
      textParts.push(`${i18nSector[this._currentLanguage]}: ${this.sector}`);
    }

    if (this.type === 'wagon') {
      if (this.label) {
        textParts.push(i18nWagonLabelNumber(parseInt(this.label))[this._currentLanguage]);
      }

      if (this.wagonClass === '1') {
        textParts.push(i18nClass['first'][this._currentLanguage]);
      } else if (this.wagonClass === '2') {
        textParts.push(i18nClass['second'][this._currentLanguage]);
      }

      if (this.occupancy && i18nOccupancy[this.occupancy]) {
        textParts.push(i18nOccupancy[this.occupancy][this._currentLanguage]);
      }
      if (this.blockedPassage && this.blockedPassage !== 'none') {
        textParts.push(i18nBlockedPassage[this.blockedPassage][this._currentLanguage]);
      }
    }

    // Additional text like e.g. "Top/End of the train"-hint
    if (this.additionalAccessibilityText) {
      textParts.push(this.additionalAccessibilityText);
    }

    return `${textParts.join(', ')}.`;
  }

  public render(): JSX.Element {
    // We should avoid lists with only one entry
    if (this._icons?.length > 1) {
      this._icons.forEach((icon, index) =>
        icon.setAttribute('slot', `sbb-train-wagon-icon-${index}`)
      );
    } else {
      this._icons.forEach((icon) => icon.removeAttribute('slot'));
    }

    return (
      <Host aria-label={this._getAccessibilityText()}>
        <div class="sbb-train-wagon">
          <span class="sbb-train-wagon__label" aria-hidden="true">
            {this.label}
          </span>
          <span class="sbb-train-wagon__compartment">
            {this.type === 'wagon' ? (
              <Fragment>
                {this.occupancy && (
                  <sbb-icon
                    name={`utilization-${this.occupancy === 'unknown' ? 'none' : this.occupancy}`}
                  ></sbb-icon>
                )}
                <span class="sbb-train-wagon__class">
                  <span aria-hidden="true">{this.wagonClass}</span>
                </span>
              </Fragment>
            ) : (
              <Fragment>
                {this.type === 'locomotive' && (
                  <svg
                    aria-hidden="true"
                    width="80"
                    height="40"
                    viewBox="0 0 80 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7906 4.42719C19.9743 1.93152 23.129 0.5 26.4452 0.5H53.5548C56.871 0.5 60.0257 1.93152 62.2094 4.4272L76.2094 20.4272C82.7157 27.8629 77.4351 39.5 67.5548 39.5H12.4452C2.56489 39.5 -2.71566 27.8629 3.79058 20.4272L17.7906 4.42719Z"
                      stroke="#767676"
                    />
                  </svg>
                )}
              </Fragment>
            )}
          </span>
          {this.type === 'wagon' && (
            <span class="sbb-train-wagon__icons">
              {this._icons?.length > 1 && (
                <ul
                  class="sbb-train-wagon__icons-list"
                  aria-label={i18nAdditionalWagonInformationHeading[this._currentLanguage]}
                >
                  {this._icons.map((_, index) => (
                    <li class="sbb-train-wagon__icons-item">
                      <slot
                        name={`sbb-train-wagon-icon-${index}`}
                        onSlotchange={(): void => this._readSlottedIcons()}
                      />
                    </li>
                  ))}
                </ul>
              )}
              <span
                class="sbb-train-wagon__icons-item"
                hidden={this._icons?.length !== 1}
                aria-label={i18nAdditionalWagonInformationHeading[this._currentLanguage]}
              >
                <slot onSlotchange={(): void => this._readSlottedIcons()} />
              </span>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
