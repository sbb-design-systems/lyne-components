import { type CSSResultGroup, isServer, nothing, type TemplateResult, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { html } from 'lit/static-html.js';

import type { AbstractConstructor } from '../core/mixins/constructor.ts';
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
  type SbbElement,
  type SbbElementType,
  SbbLanguageController,
  SbbNamedSlotListMixin,
  type SbbOccupancy,
  SbbPropertyWatcherController,
} from '../core.ts';
import { SbbDividerElement } from '../divider.pure.ts';
import { SbbIconElement } from '../icon.pure.ts';
import { SbbTimetableOccupancyIconElement } from '../timetable-occupancy-icon.pure.ts';

import type { SbbTrainFormationElement } from './train-formation/train-formation.component.ts';
import { SbbTrainFormationOrientationMixin } from './train-formation-orientation-mixin.ts';
import style from './train-wagon-common.scss?inline';

const wagonTypeToIconMap: Partial<Record<SbbTrainWagonMixinType['wagonType'], string>> = {
  couchette: 'sa-cc',
  sleeping: 'sa-wl',
  restaurant: 'sa-wr',
};

const shapePaths: Record<
  Exclude<SbbTrainWagonMixinType['wagonType'], 'couchette' | 'sleeping' | 'restaurant' | 'closed'>,
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

export declare class SbbTrainWagonMixinType extends SbbElement {
  public accessor wagonType:
    | 'wagon'
    | 'wagon-end-left'
    | 'wagon-end-right'
    | 'couchette'
    | 'sleeping'
    | 'restaurant'
    | 'locomotive'
    | 'closed';
  public accessor occupancy: SbbOccupancy | null;
  public accessor sector: string;
  public accessor blockedPassage: 'previous' | 'next' | 'both' | 'none';
  public accessor wagonClass: '1' | '2' | '1-2' | '2-1' | null;
  public accessor label: string;
  public accessor additionalAccessibilityText: string;

  protected renderTemplate(): TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbTrainWagonMixin = <T extends AbstractConstructor<SbbElement>>(
  superClass: T,
): AbstractConstructor<SbbTrainWagonMixinType> & T => {
  abstract class SbbTrainWagonMixinElement
    extends SbbTrainFormationOrientationMixin(SbbNamedSlotListMixin<SbbIconElement, T>(superClass))
    implements Partial<SbbTrainWagonMixinType>
  {
    public static elementDependencies: SbbElementType[] = [
      SbbIconElement,
      SbbTimetableOccupancyIconElement,
      SbbDividerElement,
    ];
    public static styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

    /**
     * Wagon type.
     * For `wagon-end-left` and `wagon-end-right`, please set the corresponding value of the `blockedPassage` property.
     */
    @property({ attribute: 'wagon-type', reflect: true }) public accessor wagonType:
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
    @handleDistinctChange((e: SbbTrainWagonMixinElement) => e._sectorChanged())
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

    private _language = new SbbLanguageController(this);
    private _clipStyleSheet: CSSStyleSheet | null = null;

    protected constructor(...args: any[]) {
      super(...args);
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

    private _wagonTypeLabel(): string {
      switch (this.wagonType) {
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
      if (['wagon', 'couchette', 'sleeping', 'restaurant', 'closed'].includes(this.wagonType)) {
        return shapePaths['wagon'][view];
      }
      return (
        shapePaths[this.wagonType as keyof typeof shapePaths][view] ?? shapePaths['wagon'][view]
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

    protected renderTemplate(): TemplateResult {
      const blockedPassage =
        this.wagonType === 'wagon-end-left' && this.blockedPassage === 'none'
          ? 'previous'
          : this.wagonType === 'wagon-end-right' && this.blockedPassage === 'none'
            ? 'next'
            : (this.blockedPassage ?? 'none');

      const hasBlockedPassageEntry = blockedPassage !== 'none';

      // From accessibility perspective we cannot create a list with only one entry.
      // We need to know what will be presented and switch semantics based on count.
      const listEntriesCount =
        +!!this.sector +
        +!!this.label +
        +(!!this.wagonClass && this.wagonType !== 'closed') +
        +(!!this.occupancy && this.wagonType !== 'closed') +
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

      const path = this._wagonShape();

      const availableIconRows =
        +globalThis
          .getComputedStyle?.(this)
          .getPropertyValue('--_sbb-train-wagon-attribute-icon-rows') || this.label
          ? 3
          : 4;
      this._clipStyleSheet?.replaceSync(`:host {
            --sbb-train-wagon-clip-shape: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 84 36' fill='black'%3E%3Cpath d='${path}' /%3E%3C/svg%3E");
            --sbb-train-wagon-clip-shape-compartment: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${this.orientation === 'vertical' ? 36 : 84} ${this.orientation === 'vertical' ? 84 : 36}' fill='black'%3E%3Cpath d='${path}'${this.orientation === 'vertical' ? ` transform='rotate(-90, 0, 0) scale(-1, 1)'` : ''} /%3E%3C/svg%3E");
            --sbb-train-wagon-attributes-icon-columns: ${Math.ceil(this.listChildren.length / availableIconRows)};
          }`);

      return html`
        <div class="sbb-train-wagon">
          ${when(
            listEntriesCount > 1,
            () =>
              html`<ul aria-label=${this._wagonTypeLabel()} class="sbb-train-wagon__compartment">
                ${this.sector
                  ? html`<li class="sbb-screen-reader-only">${sectorString}</li>`
                  : nothing}
                ${this.label
                  ? html`<li class="sbb-screen-reader-only">${labelString}</li>`
                  : nothing}
                ${this.wagonClass && this.wagonType !== 'closed'
                  ? html`<li class="sbb-train-wagon__class">${wagonClassContent}</li>`
                  : nothing}
                ${this.occupancy && this.wagonType !== 'closed'
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
              </ul>`,
            () =>
              html`<div class="sbb-train-wagon__compartment">
                <span class="sbb-screen-reader-only">
                  ${`${this._wagonTypeLabel()}${this.sector ? `, ${sectorString}` : ''}`}
                </span>
                ${this.label
                  ? html`<span class="sbb-screen-reader-only">${labelString}</span>`
                  : nothing}
                ${this.wagonClass && this.wagonType !== 'closed'
                  ? html`<span class="sbb-train-wagon__class">${wagonClassContent}</span>`
                  : nothing}
                ${this.occupancy && this.wagonType !== 'closed'
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
              </div> `,
          )}
          ${wagonTypeToIconMap[this.wagonType]
            ? html`<sbb-icon
                name=${wagonTypeToIconMap[this.wagonType]!}
                class="sbb-train-wagon__main-icon"
              ></sbb-icon>`
            : nothing}
          <svg class="sbb-train-wagon__shape" viewBox="0 0 84 36" aria-hidden="true">
            <path d=${path}></path>
            <path
              class="sbb-train-wagon__shape-closed"
              d=${this._view === 'top' ? 'M81 3L3 34' : 'M81 4L4 32'}
            ></path>
            <path
              class="sbb-train-wagon__shape-closed"
              d=${this._view === 'top' ? 'M81 34L3 3' : 'M81 32L4 4'}
            ></path>
          </svg>
          ${this.additionalAccessibilityText
            ? html`<span class="sbb-screen-reader-only"
                >, ${this.additionalAccessibilityText}</span
              >`
            : nothing}
          <span
            class="sbb-train-wagon__information-wrapper"
            ?hidden=${!this.listChildren.length && !this.label}
          >
            ${this.label
              ? html`<span aria-hidden="true" class="sbb-train-wagon__label">${this.label}</span>`
              : nothing}
            ${this.label && this.listChildren.length
              ? html`<sbb-divider
                  orientation=${this.orientation === 'vertical' ? 'horizontal' : 'vertical'}
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

  return SbbTrainWagonMixinElement as unknown as AbstractConstructor<SbbTrainWagonMixinType> & T;
};
