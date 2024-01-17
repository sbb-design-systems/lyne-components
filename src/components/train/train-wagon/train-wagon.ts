import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController, SlotChildObserver } from '../../core/common-behaviors';
import { setAttribute } from '../../core/dom';
import { EventEmitter } from '../../core/eventing';
import {
  i18nAdditionalWagonInformationHeading,
  i18nBlockedPassage,
  i18nClass,
  i18nClosedCompartmentLabel,
  i18nLocomotiveLabel,
  i18nSector,
  i18nWagonLabel,
  i18nWagonLabelNumber,
} from '../../core/i18n';
import type { SbbOccupancy } from '../../core/interfaces';
import type { SbbIconElement } from '../../icon';
import '../../timetable-occupancy-icon';

import style from './train-wagon.scss?lit&inline';

/**
 * It displays a train compartment within a `sbb-train` component.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-icon` for meta-information of the `sbb-train-wagon`.
 */
@customElement('sbb-train-wagon')
export class SbbTrainWagonElement extends SlotChildObserver(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    sectorChange: 'sectorChange',
  } as const;

  /** Wagon type. */
  @property({ reflect: true }) public type: 'locomotive' | 'closed' | 'wagon' = 'wagon';

  /** Occupancy of a wagon. */
  @property() public occupancy?: SbbOccupancy = 'none';

  /** Sector in which to wagon stops. */
  @property({ reflect: true })
  public set sector(value: string) {
    this._sector = value;
    this._sectorChanged();
  }
  public get sector(): string {
    return this._sector;
  }
  private _sector: string = null;

  /** Accessibility text for blocked passages of the wagon. */
  @property({ attribute: 'blocked-passage' })
  public blockedPassage: 'previous' | 'next' | 'both' | 'none' = 'none';

  /** Visible class label of a wagon. */
  @property({ attribute: 'wagon-class' }) public wagonClass?: '1' | '2';

  /** Visible label for the wagon number. Not used by type locomotive or closed. */
  @property() public label?: string;

  /** Additional accessibility text which will be appended to the end. */
  @property({ attribute: 'additional-accessibility-text' })
  public additionalAccessibilityText?: string;

  /** Slotted Sbb-icons. */
  @state() private _icons: SbbIconElement[];

  private _language = new LanguageController(this);

  /**
   * @internal
   * Emits whenever the sector value changes.
   */
  private _sectorChange: EventEmitter = new EventEmitter(
    this,
    SbbTrainWagonElement.events.sectorChange,
    {
      bubbles: true,
      cancelable: true,
    },
  );

  private _sectorChanged(): void {
    this._sectorChange.emit();
  }

  /**
   * Create an array with only the sbb-icon children.
   */
  protected override checkChildren(): void {
    this._icons = Array.from(this.children ?? []).filter(
      (e): e is SbbIconElement => e.tagName === 'SBB-ICON',
    );
  }

  protected override render(): TemplateResult {
    // We should avoid lists with only one entry
    if (this._icons?.length > 1) {
      this._icons.forEach((icon, index) =>
        icon.setAttribute('slot', `sbb-train-wagon-icon-${index}`),
      );
    } else {
      this._icons?.forEach((icon) => icon.removeAttribute('slot'));
    }

    const label = (tagName: string): TemplateResult => {
      const TAG_NAME = tagName;
      /* eslint-disable lit/binding-positions */
      return html`
        <${unsafeStatic(TAG_NAME)} class="sbb-train-wagon__label" aria-hidden=${(!this
          .label).toString()}>
          ${
            this.label
              ? html` <span class="sbb-screenreaderonly">
                    ${`${i18nWagonLabelNumber[this._language.current]},`}&nbsp;
                  </span>
                  ${this.label}`
              : nothing
          }
        </${unsafeStatic(TAG_NAME)}>
      `;
      /* eslint-disable lit/binding-positions */
    };

    const sectorString = `${i18nSector[this._language.current]}, ${this.sector}`;

    setAttribute(
      this,
      'data-has-visible-wagon-content',
      Boolean((this.type === 'wagon' && this.occupancy) || this.wagonClass),
    );

    return html`
      <div class="sbb-train-wagon">
        ${this.type === 'wagon'
          ? html`<ul
              aria-label=${i18nWagonLabel[this._language.current]}
              class="sbb-train-wagon__compartment"
            >
              ${this.sector ? html`<li class="sbb-screenreaderonly">${sectorString}</li>` : nothing}
              ${label('li')}
              ${this.wagonClass
                ? html`<li class="sbb-train-wagon__class">
                    <span class="sbb-screenreaderonly">
                      ${this.wagonClass === '1'
                        ? i18nClass['first'][this._language.current]
                        : i18nClass['second'][this._language.current]}
                    </span>
                    <span aria-hidden="true">${this.wagonClass}</span>
                  </li>`
                : nothing}
              ${this.occupancy
                ? html`<sbb-timetable-occupancy-icon
                    class="sbb-train-wagon__occupancy"
                    role="listitem"
                    .occupancy=${this.occupancy}
                  ></sbb-timetable-occupancy-icon>`
                : nothing}
              ${this.blockedPassage && this.blockedPassage !== 'none'
                ? html`<li class="sbb-screenreaderonly">
                    ${i18nBlockedPassage[this.blockedPassage][this._language.current]}
                  </li>`
                : nothing}
            </ul>`
          : nothing}
        ${this.type === 'closed'
          ? html`<span class="sbb-train-wagon__compartment">
              <span class="sbb-screenreaderonly">
                ${i18nClosedCompartmentLabel(parseInt(this.label))[this._language.current]}
                ${this.sector ? `, ${sectorString}` : nothing}
              </span>
              ${label('span')}
            </span>`
          : nothing}
        ${this.type === 'locomotive'
          ? html`<span class="sbb-train-wagon__compartment">
              <span class="sbb-screenreaderonly">
                ${i18nLocomotiveLabel[this._language.current]}
                ${this.sector ? `, ${sectorString}` : nothing}
              </span>
              ${label('span')}
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
            </span>`
          : nothing}
        ${this.additionalAccessibilityText
          ? html`<span class="sbb-screenreaderonly">, ${this.additionalAccessibilityText}</span>`
          : nothing}
        ${this.type === 'wagon'
          ? html`<span
              class="sbb-train-wagon__icons"
              ?hidden=${!this._icons || this._icons?.length === 0}
            >
              ${this._icons?.length > 1
                ? html`<ul
                    class="sbb-train-wagon__icons-list"
                    aria-label=${i18nAdditionalWagonInformationHeading[this._language.current]}
                  >
                    ${this._icons.map(
                      (_, index) =>
                        html`<li class="sbb-train-wagon__icons-item">
                          <slot name=${`sbb-train-wagon-icon-${index}`}></slot>
                        </li>`,
                    )}
                  </ul>`
                : nothing}
              <span class="sbb-train-wagon__icons-item" ?hidden=${this._icons?.length !== 1}>
                ${this._icons?.length === 1
                  ? html`<span class="sbb-screenreaderonly">
                      ${i18nAdditionalWagonInformationHeading[this._language.current]}
                    </span>`
                  : nothing}
                <slot></slot>
              </span>
            </span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-wagon': SbbTrainWagonElement;
  }
}
