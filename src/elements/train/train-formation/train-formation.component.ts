import {
  type CSSResultGroup,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  boxSizingStyles,
  hostScrollbarStyles,
  i18nSector,
  i18nSectorShort,
  i18nTrains,
  SbbElement,
  SbbLanguageController,
  SbbNamedSlotListMixin,
  type SbbOrientation,
  type WithListChildren,
} from '../../core.ts';
import type { SbbTrainElement } from '../train/train.component.ts';
import type { SbbTrainBlockedPassageElement } from '../train-blocked-passage/train-blocked-passage.component.ts';
import type { SbbTrainWagonMixinType } from '../train-wagon-common.ts';

import style from './train-formation.scss?inline';

interface AggregatedSector {
  label: string;
  wagonCount: number;
  blockedPassageCount: number;
}

/**
 * It displays a train composition, acting as a container for one or more `sbb-train` component.
 *
 * @slot - Use the unnamed slot to add 'sbb-train' elements to the `sbb-train-formation`.
 * @cssprop [--sbb-train-formation-scroll-padding=var(--sbb-spacing-fixed-1x)] - Defines the inline or block padding inside the horizontal or vertical scrolling area.
 */
export class SbbTrainFormationElement extends SbbNamedSlotListMixin<
  SbbTrainElement,
  typeof SbbElement
>(SbbElement) {
  public static override readonly elementName: string = 'sbb-train-formation';
  public static override styles: CSSResultGroup = [
    hostScrollbarStyles,
    boxSizingStyles,
    unsafeCSS(style),
  ];
  protected override readonly listChildLocalNames = ['sbb-train'];

  /** Whether the view of the wagons is from side or top perspective. */
  @property({ reflect: true }) public accessor view: 'side' | 'top' = 'side';

  /** Orientation, either horizontal or vertical. */
  @property({ reflect: true }) public accessor orientation: SbbOrientation = 'horizontal';

  @state() private accessor _sectors: AggregatedSector[] = [];

  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.addEventListener?.('trainslotchange', (e) => {
      this._readSectors(e);
      this._readDirectionLabel(e);
    });
    this.addEventListener?.('sectorchange', (e) => this._readSectors(e));
    this.addEventListener?.('directionlabelchange', (e) => this._readDirectionLabel(e));
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // When including the scrollbar styles on the host, there is no hover effect of the scrollbar possible.
    // In most cases, the component will be used in Light DOM. To also support the hover effect,
    // we additionally add the `sbb-scrollbar` CSS class to the host.
    // This is an exception as we normally don't alter the classList of the host.
    this.classList.add('sbb-scrollbar');
  }

  private _readDirectionLabel(event?: Event): void {
    // Keep the event internal.
    event?.stopPropagation();

    this.toggleState(
      'has-direction-label',
      Array.from(this.querySelectorAll?.('sbb-train') ?? []).some(
        (train) => !!train.directionLabel,
      ),
    );
  }

  private _readSectors(event?: Event): void {
    // Keep the event internal.
    event?.stopPropagation();

    this._sectors = Array.from(
      this.querySelectorAll?.<SbbTrainWagonMixinType | SbbTrainBlockedPassageElement>(
        'sbb-train-wagon,sbb-train-wagon-button,sbb-train-wagon-link,sbb-train-blocked-passage',
      ) ?? [],
    ).reduce(
      (
        aggregatedSectors: AggregatedSector[],
        item: SbbTrainWagonMixinType | SbbTrainBlockedPassageElement,
      ) => {
        const currentAggregatedSector = aggregatedSectors[aggregatedSectors.length - 1];

        if (item.localName.startsWith('sbb-train-wagon')) {
          const sectorAttribute =
            (item as SbbTrainWagonMixinType).sector ?? item.getAttribute('sector');

          if (!currentAggregatedSector.label && sectorAttribute) {
            currentAggregatedSector.label = sectorAttribute;
          }

          if (!sectorAttribute || currentAggregatedSector.label === sectorAttribute) {
            currentAggregatedSector.wagonCount++;
          } else {
            aggregatedSectors.push({
              label: sectorAttribute,
              wagonCount: 1,
              blockedPassageCount: 0,
            });
          }
        } else if (item.localName === 'sbb-train-blocked-passage') {
          currentAggregatedSector.blockedPassageCount++;
        }

        return aggregatedSectors;
      },
      [{ wagonCount: 0, blockedPassageCount: 0 } as AggregatedSector],
    );

    this.toggleState(
      'has-sectors',
      this._sectors.some((s) => !!s.label),
    );
  }

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('listChildren')) {
      this._readSectors();
      this._readDirectionLabel();
    }
  }

  protected override render(): TemplateResult {
    return html`
      ${this._sectors.length && this._sectors[0].label !== undefined
        ? html`<div class="sbb-train-formation__sectors" aria-hidden="true">
            ${this._sectors.map(
              (aggregatedSector) =>
                html`<span
                  class="sbb-train-formation__sector"
                  style=${styleMap({
                    '--sbb-train-formation-wagon-count': aggregatedSector.wagonCount,
                    '--sbb-train-formation-wagon-blocked-passage-count':
                      aggregatedSector.blockedPassageCount,
                  })}
                >
                  <span class="sbb-train-formation__sector-sticky-wrapper">
                    ${`${
                      aggregatedSector.wagonCount === 1 && aggregatedSector.label
                        ? i18nSectorShort[this._language.current]
                        : i18nSector[this._language.current]
                    } ${aggregatedSector.label ? aggregatedSector.label : ''}`}
                  </span>
                </span>`,
            )}
          </div>`
        : nothing}

      <div class="sbb-train-formation__trains">
        ${this.renderList({
          class: 'sbb-train-formation__train-list',
          ariaLabel: i18nTrains[this._language.current],
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-formation': SbbTrainFormationElement;
  }
}
