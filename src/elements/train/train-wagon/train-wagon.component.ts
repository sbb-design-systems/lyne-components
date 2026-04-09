import { type CSSResultGroup, nothing, type TemplateResult, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { html } from 'lit/static-html.js';

import {
  boxSizingStyles,
  forceType,
  handleDistinctChange,
  i18nAdditionalWagonInformationHeading,
  i18nAnd,
  i18nBlockedPassage,
  i18nClass,
  i18nClosedCompartmentLabel,
  i18nCouchetteWagonLabel,
  i18nLocomotiveLabel,
  i18nRestaurantWagonLabel,
  i18nSector,
  i18nSleepingWagonLabel,
  i18nWagonLabel,
  i18nWagonLabelNumber,
  omitEmptyConverter,
  SbbElement,
  type SbbElementType,
  SbbLanguageController,
  SbbNamedSlotListMixin,
  type SbbOccupancy,
  SbbPropertyWatcherController,
} from '../../core.ts';
import { SbbDividerElement } from '../../divider/divider.component.ts';
import { SbbIconElement } from '../../icon.pure.ts';
import { SbbTimetableOccupancyIconElement } from '../../timetable-occupancy-icon.pure.ts';
import type { SbbTrainFormationElement } from '../train-formation/train-formation.component.ts';

import '../../divider.pure.ts';

import style from './train-wagon.scss?inline';

const typeToIconMap: Record<string, string> = {
  couchette: 'sa-cc',
  sleeping: 'sa-wl',
  restaurant: 'sa-wr',
};

const shapePathMap: Record<
  Exclude<SbbTrainWagonElement['type'], 'couchette' | 'sleeping' | 'restaurant'>,
  { side: string; top: string }
> = {
  wagon: {
    side: 'M10,0 h64 a10,10 0 0 1 10,10 v16 a10,10 0 0 1 -10,10 h-64 a10,10 0 0 1 -10,-10 v-16 a10,10 0 0 1 10,-10 z',
    top: '',
  },
  locomotive: { side: '', top: '' },
  'wagon-end-left': { side: '', top: '' },
  'wagon-end-right': { side: '', top: '' },
  closed: { side: '', top: '' },
};

/**
 * It displays a train compartment within a `sbb-train` component.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-icon` for meta-information of the `sbb-train-wagon`.
 */
export class SbbTrainWagonElement extends SbbNamedSlotListMixin<SbbIconElement, typeof SbbElement>(
  SbbElement,
) {
  public static override readonly elementName: string = 'sbb-train-wagon';
  public static override elementDependencies: SbbElementType[] = [
    SbbIconElement,
    SbbTimetableOccupancyIconElement,
    SbbDividerElement,
  ];
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];
  public static readonly events = {
    sectorchange: 'sectorchange',
  } as const;

  /**
   * Wagon type.
   * For `wagon-end-left` and `wagon-end-right`, please set the corresponding value of the `blockedPassage` property.
   */
  @property({ reflect: true }) public accessor type:
    | 'wagon'
    | 'wagon-end-left'
    | 'wagon-end-right'
    | 'couchette'
    | 'sleeping'
    | 'restaurant'
    | 'locomotive'
    | 'closed' = 'wagon';

  protected override readonly listChildLocalNames = ['sbb-icon'];

  /** Occupancy of a wagon. */
  @property() public accessor occupancy: SbbOccupancy | null = null;

  /** Sector in which the wagon stops. */
  @forceType()
  @handleDistinctChange((e: SbbTrainWagonElement) => e._sectorChanged())
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor sector: string = '';

  /** Accessibility text for blocked passages of the wagon. */
  @property({ attribute: 'blocked-passage' })
  public accessor blockedPassage: 'previous' | 'next' | 'both' | 'none' = 'none';

  /** Class label */
  @property({ attribute: 'wagon-class' }) public accessor wagonClass:
    | '1'
    | '2'
    | '1-2'
    | '2-1'
    | null = null;

  /** Wagon number */
  @forceType()
  @property({ reflect: true, converter: omitEmptyConverter })
  public accessor label: string = '';

  /** Additional accessibility text which will be appended to the end. */
  @forceType()
  @property({ attribute: 'additional-accessibility-text' })
  public accessor additionalAccessibilityText: string = '';

  private _language = new SbbLanguageController(this);

  @state() private accessor _view: SbbTrainFormationElement['view'] | null = null;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-train-formation'), {
        view: (t) => {
          if (this._view) {
            this.internals.states.delete(`state-${this._view}`);
          }
          this._view = t.view;
          if (this._view) {
            this.internals.states.add(`state-${this._view}`);
          }
        },
      }),
    );
  }

  private _sectorChanged(): void {
    /** @internal */
    this.dispatchEvent(new Event('sectorchange', { bubbles: true, composed: true }));
  }

  private _typeLabel(): string {
    switch (this.type) {
      case 'closed':
        return i18nClosedCompartmentLabel[this._language.current];
      case 'locomotive':
        return i18nLocomotiveLabel[this._language.current];
      case 'couchette':
        return i18nCouchetteWagonLabel[this._language.current];
      case 'sleeping':
        return i18nSleepingWagonLabel[this._language.current];
      case 'restaurant':
        return i18nRestaurantWagonLabel[this._language.current];
      default:
        return i18nWagonLabel[this._language.current];
    }
  }

  private _wagonShape(): string {
    const view = this._view ?? 'side';
    if (['wagon', 'couchette', 'sleeping', 'restaurant'].includes(this.type)) {
      return shapePathMap['wagon'][view];
    }
    return (
      shapePathMap[this.type as keyof typeof shapePathMap][view] ?? shapePathMap['wagon'][view]
    );
  }

  private _classLabel(): string {
    switch (this.wagonClass) {
      case '1':
        return i18nClass['first'][this._language.current];
      case '2':
        return i18nClass['second'][this._language.current];
      case '1-2':
        return `${i18nClass['first'][this._language.current]} ${i18nAnd[this._language.current]} ${i18nClass['second'][this._language.current]}`;
      case '2-1':
        return `${i18nClass['second'][this._language.current]} ${i18nAnd[this._language.current]} ${i18nClass['first'][this._language.current]}`;
      default:
        return '';
    }
  }

  protected override render(): TemplateResult {
    const blockedPassage =
      this.type === 'wagon-end-left' && this.blockedPassage === 'none'
        ? 'previous'
        : this.type === 'wagon-end-right' && this.blockedPassage === 'none'
          ? 'next'
          : (this.blockedPassage ?? 'none');

    const hasBlockedPassageEntry = blockedPassage !== 'none';

    // From accessibility perspective we cannot create a list with only one entry.
    // We need to know what will be presented and switch semantics based on count.
    const listEntriesCount =
      +!!this.sector +
      +!!this.label +
      +(!!this.wagonClass && this.type !== 'closed') +
      +(!!this.occupancy && this.type !== 'closed') +
      +hasBlockedPassageEntry;

    const sectorString = `${i18nSector[this._language.current]}, ${this.sector}`;
    const labelString = `${i18nWagonLabelNumber[this._language.current]}, ${this.label}`;

    const wagonClassContent = html`<span class="sbb-screen-reader-only">
        ${this._classLabel()}
      </span>
      ${this.wagonClass
        ?.split('-')
        .map(
          (wagonClass) =>
            html`<span
              aria-hidden="true"
              class="sbb-train-wagon__class-entry ${wagonClass === '1' ? 'first' : ''}"
            >
              ${wagonClass}
            </span>`,
        )} `;

    const mainIcon = typeToIconMap[this.type]
      ? html`<sbb-icon
          name=${typeToIconMap[this.type]}
          class="sbb-train-wagon__main-icon"
        ></sbb-icon>`
      : nothing;

    const path = this._wagonShape();
    const borderWidth = 1; // TODO: isActive = 3;
    const vertical = false; // TODO: inherit
    const wagonShape = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${vertical ? 36 : 84} ${vertical ? 84 : 36}' fill='none'%3E%3Cpath d='${path}' stroke='%23000000' stroke-width='${borderWidth * 2}'${vertical ? ` transform='rotate(90, 0, 0) translate(0 -36)'` : ''} /%3E%3C/svg%3E")`;
    const wagonClipShape = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${vertical ? 36 : 84} ${vertical ? 84 : 36}' fill='black'%3E%3Cpath d='${path}'${vertical ? ` transform='rotate(90, 0, 0) translate(0 -36)'` : ''} /%3E%3C/svg%3E")`;

    return html`
      <style>
        :host {
          --sbb-train-wagon-shape: ${wagonShape};
          --sbb-train-wagon-clip-shape: ${wagonClipShape};
        }
      </style>
      <div class="sbb-train-wagon">
        ${when(
          listEntriesCount > 1,
          () =>
            html`<ul aria-label=${this._typeLabel()} class="sbb-train-wagon__compartment">
              ${this.sector
                ? html`<li class="sbb-screen-reader-only">${sectorString}</li>`
                : nothing}
              ${this.label ? html`<li class="sbb-screen-reader-only">${labelString}</li>` : nothing}
              ${this.wagonClass && this.type !== 'closed'
                ? html`<li class="sbb-train-wagon__class">${wagonClassContent}</li>`
                : nothing}
              ${this.occupancy && this.type !== 'closed'
                ? html`<sbb-timetable-occupancy-icon
                    class="sbb-train-wagon__occupancy"
                    role="listitem"
                    occupancy=${this.occupancy}
                  ></sbb-timetable-occupancy-icon>`
                : nothing}
              ${hasBlockedPassageEntry
                ? html`<li class="sbb-screen-reader-only">
                    ${i18nBlockedPassage[blockedPassage][this._language.current]}
                  </li>`
                : nothing}
              ${mainIcon}
            </ul>`,
          () =>
            html`<div class="sbb-train-wagon__compartment">
              <span class="sbb-screen-reader-only">
                ${`${this._typeLabel()}${this.sector ? `, ${sectorString}` : ''}`}
              </span>
              ${this.label
                ? html`<span class="sbb-screen-reader-only">${labelString}</span>`
                : nothing}
              ${this.wagonClass && this.type !== 'closed'
                ? html`<span class="sbb-train-wagon__class">${wagonClassContent}</span>`
                : nothing}
              ${this.occupancy && this.type !== 'closed'
                ? html`<sbb-timetable-occupancy-icon
                    class="sbb-train-wagon__occupancy"
                    occupancy=${this.occupancy}
                  ></sbb-timetable-occupancy-icon>`
                : nothing}
              ${hasBlockedPassageEntry
                ? html`<span class="sbb-screen-reader-only">
                    ${i18nBlockedPassage[blockedPassage][this._language.current]}
                  </span>`
                : nothing}
              ${mainIcon}
            </div> `,
        )}
        ${this.additionalAccessibilityText
          ? html`<span class="sbb-screen-reader-only">, ${this.additionalAccessibilityText}</span>`
          : nothing}
        <span class="sbb-train-wagon__information-wrapper">
          ${this.label ? html`<span aria-hidden="true">${this.label}</span>` : nothing}
          ${this.label && this.listChildren.length
            ? html`<sbb-divider
                orientation="vertical"
                aria-hidden="true"
                class="sbb-train-wagon__label-divider"
              ></sbb-divider>`
            : nothing}
          ${this.renderList({
            class: 'sbb-train-wagon__attribute-icon-list',
            ariaLabel: i18nAdditionalWagonInformationHeading[this._language.current],
          })}
        </span>
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
