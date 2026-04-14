import { type CSSResultGroup, isServer, nothing, type TemplateResult, unsafeCSS } from 'lit';
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
  type SbbOrientation,
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

const shapePaths: Record<
  Exclude<SbbTrainWagonElement['type'], 'couchette' | 'sleeping' | 'restaurant' | 'closed'>,
  { side: string; top: string }
> = {
  wagon: {
    side: 'M12 0H72A12 12 0 0184 12V24A12 12 0 0172 36H12A12 12 0 010 24V12A12 12 0 0112 0Z',
    top: 'M8 0A8 8 0 000 8V28a8 8 0 008 8H76a8 8 0 008-8V8A8 8 0 0076 0H8Z',
  },
  locomotive: {
    side: 'M7.7 8.6C10.5 3.6 16 0 22 0H62c6 0 11.5 3.6 14.3 8.6l5.1 9C85.9 25.6 80 36 71 36H13C4 36-1.9 25.6 2.6 17.6l5.1-9Z',
    top: 'M66 0H18C8 0 0 8 0 18S8 36 18 36H66c10 0 18-8 18-18S76 0 66 0Z',
  },
  'wagon-end-left': {
    side: 'M7.7 8.6A16 16 0 0122 0H72c6 0 12 6 12 12V24c0 6-6 12-12 12H13C3.8 36-2 26.1 2.6 18.1Z',
    top: 'M76 0H18C8.25 0 .5 8.25.5 18S8 36 18 36H76c4 0 8-4 8-8V8c0-4-4-8-8-8Z',
  },
  'wagon-end-right': {
    side: 'M76.3 8.6A16 16 0 0062 0H12C6 0 0 6 0 13v11c0 6 6 12 12 12h58.4c8.6 0 15-9.9 10.4-17.9z',
    top: 'M66 0H8C4 0 0 4 0 8V28c0 4 4 8 8 8H66c9.75 0 17.5-8.25 17.5-18S76 0 66 0Z',
  },
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

  @state() private accessor _view: SbbTrainFormationElement['view'] | null = null;
  @state() private accessor _orientation: SbbOrientation | null = null;

  private _language = new SbbLanguageController(this);
  private _clipStyleSheet: CSSStyleSheet | null = null;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-train-formation'), {
        view: (t) => {
          if (this._view) {
            this.internals.states.delete(`view-${this._view}`);
          }
          this._view = t.view;
          if (this._view) {
            this.internals.states.add(`view-${this._view}`);
          }
        },
        orientation: (t) => {
          if (this._orientation) {
            this.internals.states.delete(`orientation-${this._orientation}`);
          }
          this._orientation = t.orientation;
          if (this._orientation) {
            this.internals.states.add(`orientation-${this._orientation}`);
          }
        },
      }),
    );
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    const renderRoot = super.createRenderRoot();

    if (!isServer) {
      this._clipStyleSheet = new CSSStyleSheet();
      (renderRoot as ShadowRoot).adoptedStyleSheets.push(this._clipStyleSheet);
    }

    return renderRoot;
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
    if (['wagon', 'couchette', 'sleeping', 'restaurant', 'closed'].includes(this.type)) {
      return shapePaths['wagon'][view];
    }
    return shapePaths[this.type as keyof typeof shapePaths][view] ?? shapePaths['wagon'][view];
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

    const availableIconRows =
      +globalThis
        .getComputedStyle?.(this)
        .getPropertyValue('--sbb-train-wagon-attribute-icon-rows') || this.label
        ? 3
        : 4;
    this._clipStyleSheet?.replaceSync(`:host {
          --sbb-train-wagon-clip-shape: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 84 36' fill='black'%3E%3Cpath d='${path}' /%3E%3C/svg%3E");
          --sbb-train-wagon-clip-shape-compartment: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${this._orientation === 'vertical' ? 36 : 84} ${this._orientation === 'vertical' ? 84 : 36}' fill='black'%3E%3Cpath d='${path}'${this._orientation === 'vertical' ? ` transform='rotate(90, 0, 0) translate(0 -36)'` : ''} /%3E%3C/svg%3E");
          --sbb-train-wagon-attributes-icon-columns: ${Math.ceil(this.listChildren.length / availableIconRows)};
        }`);

    return html`
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
        <svg class="sbb-train-wagon__shape" viewBox="0 0 84 36" aria-hidden="true">
          <path d=${path}></path>
        </svg>
        ${this.additionalAccessibilityText
          ? html`<span class="sbb-screen-reader-only">, ${this.additionalAccessibilityText}</span>`
          : nothing}
        <span class="sbb-train-wagon__information-wrapper">
          ${this.label
            ? html`<span aria-hidden="true" class="sbb-train-wagon__label">${this.label}</span>`
            : nothing}
          ${this.label && this.listChildren.length
            ? html`<sbb-divider
                orientation=${this._orientation === 'vertical' ? 'horizontal' : 'vertical'}
                aria-hidden="true"
                class="sbb-train-wagon__label-divider"
              ></sbb-divider>`
            : nothing}
          ${this.renderList({
            class: 'sbb-train-wagon__attribute-icon-list',
            ariaLabel: i18nAdditionalWagonInformationHeading[this._language.current],
          })}
          ${this.type === 'closed'
            ? html`<svg
                class="sbb-train-wagon__closed-cross"
                viewBox="0 0 84 36"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d=${this._view === 'top' ? 'M81 3L3 34' : 'M81 4L4 32'} />
                <path d=${this._view === 'top' ? 'M81 34L3 3' : 'M81 32L4 4'} />
              </svg>`
            : nothing}
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
