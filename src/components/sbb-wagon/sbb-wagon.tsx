import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { InterfaceSbbWagonAttributes } from './sbb-wagon.custom.d';
// import { Components } from '../../components';

let nextId = 0;

/**
 * @slot unnamed - Use this to document a slot.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-wagon.scss',
  tag: 'sbb-wagon',
})
export class SbbWagon {
  /** Wagon type */
  @Prop({ reflect: true }) public type: InterfaceSbbWagonAttributes['type'] = 'wagon';

  /** Occupation icon of a wagon */
  @Prop() public occupancy: InterfaceSbbWagonAttributes['occupancy'] = 'none';

  /** Visible class label of a wagon */
  @Prop() public wagonClass?: '1' | '2';

  /** Visible label for the wagon number. Not used by type locomotive or blocked. */
  @Prop() public label?: string;

  /** Accessibility text for translations to describe the wagon type */
  @Prop() public accessibilityLabelWagon = '';

  /** Accessibility text for translations to add additional information to wagon */
  @Prop() public accessibilityAdditionalWagonText = '';

  /** Accessibility text for translations to describe the occupation level of a wagon */
  @Prop() public accessibilityLabelOccupation = '';

  /** Accessibility text for translations to describe the class of a wagon */
  @Prop() public accessibilityLabelClass = '';

  /** Accessibility-text for translations as the list title for additional information icons on a wagon */
  @Prop() public accessibilityLabelIconListTitle = '';

  /** This id will be forwarded to the relevant inner element. */
  @Prop() public iconListTitleId = `sbb-wagon-list-title-${++nextId}`;

  /** Slotted Sbb-Icons */
  @State() private _icons: HTMLSbbIconElement[];

  /** Host element */
  @Element() private _element!: HTMLElement;

  public connectedCallback(): void {
    this._readSlottedIcons();
  }

  /**
   * Create an array with only the sbb-icon children
   */
  private _readSlottedIcons(): void {
    this._icons = Array.from(this._element.children).filter(
      (e): e is HTMLSbbIconElement => e.tagName === 'SBB-ICON'
    );
  }

  /**
   * Create the accessibility text for the specific wagon types
   */
  private _getAccessibilityText(): string {
    if (this.type === 'wagon') {
      let text = `${this.accessibilityLabelWagon} ${this.label}.`;
      text = this.accessibilityLabelClass.length
        ? `${text} ${this.accessibilityLabelClass}.`
        : text;
      text = this.accessibilityLabelOccupation.length
        ? `${text} ${this.accessibilityLabelOccupation}.`
        : text;
      text = this.accessibilityAdditionalWagonText.length
        ? `${text} ${this.accessibilityAdditionalWagonText}.`
        : text;
      return text;
    }
    return `${this.accessibilityLabelWagon} ${this.accessibilityAdditionalWagonText}`;
  }

  public render(): JSX.Element {
    const occupancyIcon = `utilization-${this.occupancy}`;
    this._icons.forEach((icon, index) => icon.setAttribute('slot', `sbb-wagon-icon-${index}`));
    return (
      <div class="sbb-wagon">
        <p class="sbb-wagon__label">
          <span>{this._getAccessibilityText()}</span>
          {this.type === 'wagon' && <span aria-hidden="true">{this.label}</span>}
        </p>

        {this.type === 'wagon' ? (
          <div class="sbb-wagon__comparment">
            <sbb-icon name={occupancyIcon}></sbb-icon>
            <span class="sbb-wagon__class">
              <span aria-hidden="true">{this.wagonClass}</span>
            </span>
          </div>
        ) : (
          <div class="sbb-wagon__comparment">
            {this.type === 'locomotive' ? (
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
            ) : (
              <span></span>
            )}
          </div>
        )}
        {this.type === 'wagon' && (
          <div class="sbb-wagon__icons">
            <p aria-hidden="true" id={this.iconListTitleId}>
              {this.accessibilityLabelIconListTitle}
            </p>
            <ul aria-labelledby={this.iconListTitleId}>
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
