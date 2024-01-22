import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { LanguageController, SlotChildObserver } from '../../core/common-behaviors';
import { ConnectedAbortController } from '../../core/eventing';
import { i18nSector, i18nSectorShort, i18nTrains } from '../../core/i18n';
import { AgnosticResizeObserver } from '../../core/observers';
import type { SbbTrainElement } from '../train';
import type { SbbTrainBlockedPassageElement } from '../train-blocked-passage';
import type { SbbTrainWagonElement } from '../train-wagon';

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
 */
@customElement('sbb-train-formation')
export class SbbTrainFormationElement extends SlotChildObserver(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Option to hide all wagon labels. */
  @property({ attribute: 'hide-wagon-label', reflect: true, type: Boolean }) public hideWagonLabel =
    false;

  @state() private _sectors: AggregatedSector[] = [];

  @state() private _trains: SbbTrainElement[] = [];

  /** Element that defines the visible content width. */
  private _formationDiv!: HTMLDivElement;
  private _contentResizeObserver = new AgnosticResizeObserver(() => this._applyCssWidth());
  private _abort = new ConnectedAbortController(this);
  private _language = new LanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('trainSlotChange', (e) => this._readSectors(e), { signal });
    this.addEventListener('sectorChange', (e) => this._readSectors(e), { signal });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._contentResizeObserver.disconnect();
  }

  /**
   * Apply width of the scrollable space of the formation as a css variable. This will be used from
   * every slotted sbb-train for the direction-label
   */
  private _applyCssWidth(): void {
    const contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._formationDiv.style.setProperty('--sbb-train-direction-width', `${contentWidth}px`);
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

        if (item.tagName === 'SBB-TRAIN-WAGON') {
          const sectorAttribute = (item as SbbTrainWagonElement).sector;

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
        } else if (item.tagName === 'SBB-TRAIN-BLOCKED-PASSAGE') {
          currentAggregatedSector.blockedPassageCount++;
        }

        return aggregatedSectors;
      },
      [{ wagonCount: 0, blockedPassageCount: 0 } as AggregatedSector],
    );
  }

  protected override checkChildren(): void {
    this._readSectors();
    this._trains = Array.from(this.children ?? []).filter(
      (e): e is SbbTrainElement => e.tagName === 'SBB-TRAIN',
    );
  }

  private async _updateFormationDiv(el?: Element): Promise<void> {
    if (!el) {
      return;
    }
    this._contentResizeObserver.disconnect();
    this._formationDiv = el as HTMLDivElement;
    this._contentResizeObserver.observe(this._formationDiv);
    // There seems to be a slight difference between browser, in how the
    // observer is called. In order to be consistent across browsers
    // we set the width manually once the component update is complete.
    await this.updateComplete;
    this._applyCssWidth();
  }

  protected override render(): TemplateResult {
    // We should avoid lists with only one entry
    if (this._trains?.length > 1) {
      this._trains.forEach((train, index) => train.setAttribute('slot', `train-${index}`));
    } else {
      this._trains?.forEach((train) => train.removeAttribute('slot'));
    }

    return html`
      <div class="sbb-train-formation" ${ref(this._updateFormationDiv)}>
        <div class="sbb-train-formation__sectors" aria-hidden="true">
          ${this._sectors.map(
            (aggregatedSector) =>
              html`<span
                class="sbb-train-formation__sector"
                style="
                --sbb-train-formation-wagon-count: ${aggregatedSector.wagonCount};
                --sbb-train-formation-wagon-blocked-passage-count: ${aggregatedSector.blockedPassageCount}"
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
        </div>

        <div class="sbb-train-formation__trains">
          ${this._trains?.length > 1
            ? html`<ul
                class="sbb-train-formation__train-list"
                aria-label=${i18nTrains[this._language.current]}
              >
                ${this._trains.map(
                  (_, index) =>
                    html`<li class="sbb-train-formation__train-list-item">
                      <slot name=${`train-${index}`}></slot>
                    </li>`,
                )}
              </ul>`
            : nothing}

          <span class="sbb-train-formation__single-train" ?hidden=${this._trains?.length !== 1}>
            <slot></slot>
          </span>
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
