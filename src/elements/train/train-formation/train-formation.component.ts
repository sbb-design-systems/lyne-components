import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { SbbLanguageController } from '../../core/controllers.ts';
import { i18nSector, i18nSectorShort, i18nTrains } from '../../core/i18n.ts';
import { SbbNamedSlotListMixin, type WithListChildren } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbTrainBlockedPassageElement } from '../train-blocked-passage.ts';
import type { SbbTrainWagonElement } from '../train-wagon.ts';
import type { SbbTrainElement } from '../train.ts';

import style from './train-formation.scss?lit&inline';

interface AggregatedSector {
  label: string;
  wagonCount: number;
  blockedPassageCount: number;
}

/**
 * It displays a train composition, acting as a container for one or more `sbb-train` component.
 *
 * @slot - Use the unnamed slot to add 'sbb-train' elements to the `sbb-train-formation`.
 * @cssprop [--sbb-train-formation-padding-inline=0px] - Defines the inline padding inside the horizontal scrolling area.
 */
export
@customElement('sbb-train-formation')
class SbbTrainFormationElement extends SbbNamedSlotListMixin<SbbTrainElement, typeof LitElement>(
  LitElement,
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  protected override readonly listChildLocalNames = ['sbb-train'];

  /** Whether the view of the wagons is from side or top perspective. */
  @property({ reflect: true }) public accessor view: 'side' | 'top' = 'side';

  @state() private accessor _sectors: AggregatedSector[] = [];

  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.addEventListener?.('trainslotchange', (e) => this._readSectors(e));
    this.addEventListener?.('sectorchange', (e) => this._readSectors(e));
  }

  private _readSectors(event?: Event): void {
    // Keep the event internal.
    event?.stopPropagation();

    this._sectors = Array.from(
      this.querySelectorAll?.<SbbTrainWagonElement | SbbTrainBlockedPassageElement>(
        'sbb-train-wagon,sbb-train-blocked-passage',
      ) ?? [],
    ).reduce(
      (
        aggregatedSectors: AggregatedSector[],
        item: SbbTrainWagonElement | SbbTrainBlockedPassageElement,
      ) => {
        const currentAggregatedSector = aggregatedSectors[aggregatedSectors.length - 1];

        if (item.localName === 'sbb-train-wagon') {
          const sectorAttribute =
            (item as SbbTrainWagonElement).sector ?? item.getAttribute('sector');

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
  }

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('listChildren')) {
      this._readSectors();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-train-formation">
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
