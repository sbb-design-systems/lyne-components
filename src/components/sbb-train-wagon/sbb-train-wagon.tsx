import {
  Component,
  ComponentInterface,
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
export class SbbTrainWagon implements ComponentInterface {
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

  /** Additional accessibility text which will be appended to the end. */
  @Prop() public additionalAccessibilityText?: string;

  /** Slotted Sbb-icons. */
  @State() private _icons: HTMLSbbIconElement[];

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLSbbTrainWagonElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
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
      (e): e is HTMLSbbIconElement => e.tagName === 'SBB-ICON',
    );
  }

  public render(): JSX.Element {
    // We should avoid lists with only one entry
    if (this._icons?.length > 1) {
      this._icons.forEach((icon, index) =>
        icon.setAttribute('slot', `sbb-train-wagon-icon-${index}`),
      );
    } else {
      this._icons?.forEach((icon) => icon.removeAttribute('slot'));
    }

    const label = (tagName: string): JSX.Element => {
      const TAG_NAME = tagName;
      return (
        <TAG_NAME class="sbb-train-wagon__label" aria-hidden={(!this.label).toString()}>
          {this.label && (
            <Fragment>
              <span class="sbb-screenreaderonly">
                {`${i18nWagonLabelNumber[this._currentLanguage]},`}&nbsp;
              </span>
              {this.label}
            </Fragment>
          )}
        </TAG_NAME>
      );
    };

    const sectorString = `${i18nSector[this._currentLanguage]}, ${this.sector}`;

    return (
      <Host
        data-has-visible-wagon-content={Boolean(
          (this.type === 'wagon' && this.occupancy) || this.wagonClass,
        )}
      >
        <div class="sbb-train-wagon">
          {this.type === 'wagon' && (
            <ul
              aria-label={i18nWagonLabel[this._currentLanguage]}
              class="sbb-train-wagon__compartment"
            >
              {this.sector && <li class="sbb-screenreaderonly">{sectorString}</li>}
              {label('li')}
              {this.wagonClass && (
                <li class="sbb-train-wagon__class">
                  <span class="sbb-screenreaderonly">
                    {this.wagonClass === '1'
                      ? i18nClass['first'][this._currentLanguage]
                      : i18nClass['second'][this._currentLanguage]}
                  </span>
                  <span aria-hidden="true">{this.wagonClass}</span>
                </li>
              )}

              {this.occupancy && (
                <sbb-icon
                  class="sbb-train-wagon__occupancy"
                  role="listitem"
                  name={`utilization-${this.occupancy === 'unknown' ? 'none' : this.occupancy}`}
                  aria-hidden="false"
                  aria-label={i18nOccupancy[this.occupancy][this._currentLanguage]}
                ></sbb-icon>
              )}

              {this.blockedPassage && this.blockedPassage !== 'none' && (
                <li class="sbb-screenreaderonly">
                  {i18nBlockedPassage[this.blockedPassage][this._currentLanguage]}
                </li>
              )}
            </ul>
          )}

          {this.type === 'closed' && (
            <span class="sbb-train-wagon__compartment">
              <span class="sbb-screenreaderonly">
                {i18nClosedCompartmentLabel(parseInt(this.label))[this._currentLanguage]}
                {this.sector && `, ${sectorString}`}
              </span>
              {label('span')}
            </span>
          )}

          {this.type === 'locomotive' && (
            <span class="sbb-train-wagon__compartment">
              <span class="sbb-screenreaderonly">
                {i18nLocomotiveLabel[this._currentLanguage]}
                {this.sector && `, ${sectorString}`}
              </span>
              {label('span')}
              <svg
                class="sbb-train-wagon__locomotive"
                aria-hidden="true"
                width="80"
                height="40"
                viewBox="0 0 80 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7906 4.42719C19.9743 1.93152 23.129 0.5 26.4452 0.5H53.5548C56.871 0.5 60.0257 1.93152 62.2094 4.4272L76.2094 20.4272C82.7157 27.8629 77.4351 39.5 67.5548 39.5H12.4452C2.56489 39.5 -2.71566 27.8629 3.79058 20.4272L17.7906 4.42719Z"
                  stroke="var(--sbb-train-wagon-shape-color-closed)"
                />
              </svg>
            </span>
          )}

          {this.additionalAccessibilityText && (
            <span class="sbb-screenreaderonly">, {this.additionalAccessibilityText}</span>
          )}

          {this.type === 'wagon' && (
            <span class="sbb-train-wagon__icons" hidden={!this._icons || this._icons?.length === 0}>
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
              <span class="sbb-train-wagon__icons-item" hidden={this._icons?.length !== 1}>
                {this._icons?.length === 1 && (
                  <span class="sbb-screenreaderonly">
                    {i18nAdditionalWagonInformationHeading[this._currentLanguage]}
                  </span>
                )}
                <slot onSlotchange={(): void => this._readSlottedIcons()} />
              </span>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
