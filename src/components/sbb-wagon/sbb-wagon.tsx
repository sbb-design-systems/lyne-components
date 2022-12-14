import { Component, Element, Fragment, h, JSX, Prop, State } from '@stencil/core';
import { InterfaceSbbWagonAttributes } from './sbb-wagon.custom.d';
import getDocumentLang from '../../global/helpers/get-document-lang';
import {
  i18nWagonLabel,
  i18nClass,
  i18nOccupancy,
  i18nBlockedPassage,
  i18nLocomotiveLabel,
  i18nAdditionalWagonInformationHeading,
  i18nClosedCompartmentLabel,
} from '../../global/i18n';

/**
 * @slot unnamed - Used to slot one to x icons for meta information of the sbb-wagon.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-wagon.scss',
  tag: 'sbb-wagon',
})
export class SbbWagon {
  /** Wagon type. */
  @Prop({ reflect: true }) public type: InterfaceSbbWagonAttributes['type'] = 'wagon';

  /** Occupancy of a wagon. */
  @Prop() public occupancy: InterfaceSbbWagonAttributes['occupancy'] = 'unknown';

  /** Accessibility text for blocked passages of the wagon. */
  @Prop() public blockedPassage: InterfaceSbbWagonAttributes['blockedPassage'] = 'none';

  /** Visible class label of a wagon. */
  @Prop() public wagonClass?: '1' | '2';

  /** Visible label for the wagon number. Not used by type locomotive or closed. */
  @Prop() public label?: string;

  /** Custom accessibility text to overwrite the constructed default text. */
  @Prop() public customAccessibilityLabel = '';

  /** Additional accessibility text which will be appended to the constructed default text. */
  @Prop() public additionalAccessibilityText = '';

  /** Slotted Sbb-icons. */
  @State() private _icons: HTMLSbbIconElement[];

  /** Host element. */
  @Element() private _element!: HTMLElement;

  /** Current document language */
  private _language: string;

  public connectedCallback(): void {
    this._language = getDocumentLang();
    this._readSlottedIcons();
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
    if (this.customAccessibilityLabel.length) {
      return this.customAccessibilityLabel;
    }

    let text = '';
    if (this.type === 'locomotive') {
      text = `${i18nLocomotiveLabel[this._language]}.`;
    } else if (this.type === 'closed') {
      text = i18nClosedCompartmentLabel(parseInt(this.label))[this._language];
    } else {
      // Wagon type text
      text = `${i18nWagonLabel(parseInt(this.label))[this._language]}`;
      // Class text
      text =
        this.wagonClass === '1'
          ? `${text} ${i18nClass['first'][this._language]}.`
          : `${text} ${i18nClass['second'][this._language]}.`;
      // Occupancy text
      text = `${text} ${i18nOccupancy[this.occupancy][this._language]}`;
      // Blocked passage
      if (this.blockedPassage !== 'none') {
        text = `${text} ${i18nBlockedPassage[this.blockedPassage][this._language]}`;
      }
    }
    // Additional text like e.g. "Top/End of the train"-hint
    text = this.additionalAccessibilityText.length
      ? `${text} ${this.additionalAccessibilityText}.`
      : text;

    return text;
  }

  public render(): JSX.Element {
    const occupancyIcon = `utilization-${this.occupancy === 'unknown' ? 'none' : this.occupancy}`;
    this._icons.forEach((icon, index) => icon.setAttribute('slot', `sbb-wagon-icon-${index}`));
    return (
      <div class="sbb-wagon">
        <span class="sbb-wagon__label">
          <span class="sbb-wagon__label-screenreader">{this._getAccessibilityText()}</span>
          <span class="sbb-wagon__label-text" aria-hidden="true">
            {this.label}
          </span>
        </span>
        <div class="sbb-wagon__compartment">
          {this.type === 'wagon' ? (
            <Fragment>
              <sbb-icon name={occupancyIcon}></sbb-icon>
              <span class="sbb-wagon__class">
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
        </div>
        {this.type === 'wagon' && (
          <div class="sbb-wagon__icons">
            <p aria-hidden="true" id="sbb-wagon__list-title">
              {i18nAdditionalWagonInformationHeading[this._language]}
            </p>
            <ul aria-labelledby="sbb-wagon__list-title">
              {this._icons.map((_, index) => (
                <li>
                  <slot
                    name={`sbb-wagon-icon-${index}`}
                    onSlotchange={(): void => this._readSlottedIcons()}
                  />
                </li>
              ))}
            </ul>
            <span hidden>
              <slot onSlotchange={(): void => this._readSlottedIcons()} />
            </span>
          </div>
        )}
      </div>
    );
  }
}
